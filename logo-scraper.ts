#!/usr/bin/env node

/**
 * Logo Scraper for syket.io
 * Downloads programming language icons from the website's canvas/badges section
 */

import puppeteer, { Browser, Page } from 'puppeteer';
import fs from 'fs/promises';
import { createWriteStream } from 'fs';
import path from 'path';
import https from 'https';
import { URL } from 'url';

interface ScraperOptions {
  url?: string;
  outputDir?: string;
  headless?: boolean;
  viewport?: {
    width: number;
    height: number;
  };
}

interface IconData {
  src: string;
  alt: string;
  className: string;
  width: number;
  height: number;
  index: number | string;
  isCanvas?: boolean;
  isBadge?: boolean;
}

interface DownloadedIcon extends IconData {
  filename: string;
}

interface ScrapingReport {
  timestamp: string;
  source: string;
  totalIcons: number;
  icons: Array<{
    filename: string;
    alt: string;
    originalSrc: string;
    dimensions: string;
    type: 'canvas' | 'badge' | 'image';
  }>;
}

class LogoScraper {
  private url: string;
  private outputDir: string;
  private headless: boolean;
  private viewport: { width: number; height: number };
  private browser?: Browser;
  private page?: Page;

  constructor(options: ScraperOptions = {}) {
    this.url = options.url || 'https://www.syket.io/';
    this.outputDir = options.outputDir || './downloaded-icons';
    this.headless = options.headless !== false;
    this.viewport = options.viewport || { width: 1920, height: 1080 };
  }

  async init(): Promise<void> {
    console.log('🚀 Initializing Logo Scraper...');
    
    // Create output directory
    try {
      await fs.mkdir(this.outputDir, { recursive: true });
      console.log(`📁 Created output directory: ${this.outputDir}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('❌ Error creating output directory:', errorMessage);
      throw error;
    }

    // Launch browser
    this.browser = await puppeteer.launch({
      headless: this.headless,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    this.page = await this.browser.newPage();
    await this.page.setViewport(this.viewport);
    
    console.log('✅ Browser launched successfully');
  }

  async scrapeLogos(): Promise<DownloadedIcon[]> {
    console.log(`🌐 Navigating to ${this.url}...`);
    
    if (!this.page) {
      throw new Error('Page not initialized. Call init() first.');
    }
    
    try {
      await this.page.goto(this.url, { 
        waitUntil: 'networkidle0',
        timeout: 30000 
      });
      console.log('✅ Page loaded successfully');

      // Wait for content to load
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Extract all images that look like technology icons/logos
      const iconData: IconData[] = await this.page.evaluate(() => {
        const icons: IconData[] = [];
        
        // Look for images with common icon patterns
        const images = document.querySelectorAll('img');
        
        images.forEach((img, index) => {
          const src = img.src;
          const alt = img.alt || img.title || '';
          const className = img.className || '';
          
          // Filter for likely technology icons based on:
          // 1. Alt text containing tech terms
          // 2. Small dimensions (icons are usually small)
          // 3. SVG or common icon formats
          // 4. Specific selectors that might contain tech badges
          
          const techKeywords = [
            'typescript', 'javascript', 'react', 'node', 'html', 'css', 
            'python', 'java', 'docker', 'git', 'github', 'firebase', 
            'postgresql', 'mongodb', 'express', 'next', 'flutter', 
            'android', 'ios', 'swift', 'kotlin', 'dart', 'prisma',
            'vercel', 'nginx', 'jest', 'cypress', 'figma', 'jira',
            'gitlab', 'sonarqube', 'studio', 'testing', 'library'
          ];
          
          const isLikelyIcon = (
            // Only include SVG data URLs
            src.includes('data:image/svg+xml') ||
            // Or regular SVG files
            src.includes('.svg')
          ) && (
            // And check alt text for tech keywords
            techKeywords.some(keyword => 
              alt.toLowerCase().includes(keyword)
            ) ||
            // Or check src path for tech keywords
            techKeywords.some(keyword => 
              src.toLowerCase().includes(keyword)
            ) ||
            // Or generic icon indicators
            src.includes('icon') ||
            alt.toLowerCase().includes('icon')
          );
          
          if (isLikelyIcon && src) {
            icons.push({
              src: src,
              alt: alt,
              className: className,
              width: img.width,
              height: img.height,
              index: index
            });
          }
        });

        // Look for canvas elements and extract embedded images from their HTML
        const canvases = document.querySelectorAll('canvas');
        canvases.forEach((canvas, canvasIndex) => {
          // Check if canvas contains embedded images in its innerHTML
          const canvasHTML = canvas.innerHTML;
          if (canvasHTML) {
            // Extract img tags from canvas HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = canvasHTML;
            const embeddedImages = tempDiv.querySelectorAll('img');
            
            embeddedImages.forEach((img, imgIndex) => {
              const src = img.src;
              const alt = img.alt || img.title || `canvas-embedded-${canvasIndex}-${imgIndex}`;
              
              // Only include SVG data URLs
              if (src && src.includes('data:image/svg+xml')) {
                icons.push({
                  src: src,
                  alt: alt,
                  className: img.className || '',
                  width: img.width || 42,
                  height: img.height || 42,
                  index: `canvas-embedded-${canvasIndex}-${imgIndex}`,
                  isCanvas: true
                });
              }
            });
          }
          
        // Remove canvas-drawn content extraction since we only want SVGs
        // Canvas drawn content is typically PNG, not SVG
        });

        // Look for technology badge elements with SVG backgrounds only
        const badges = document.querySelectorAll('[class*="badge"], [class*="tag"], [class*="skill"], [class*="tech"]');
        badges.forEach((badge, index) => {
          const element = badge as HTMLElement;
          const bgImage = window.getComputedStyle(element).backgroundImage;
          if (bgImage && bgImage !== 'none' && bgImage.includes('url(')) {
            const url = bgImage.slice(5, -2); // Remove 'url("' and '")'
            // Only include SVG background images
            if (url.includes('.svg') || url.includes('data:image/svg+xml')) {
              icons.push({
                src: url,
                alt: element.textContent?.trim() || `badge-${index}`,
                className: element.className || '',
                width: element.offsetWidth,
                height: element.offsetHeight,
                index: `badge-${index}`,
                isBadge: true
              });
            }
          }
        });

        return icons;
      });

      console.log(`🎯 Found ${iconData.length} potential icons/logos`);
      
      if (iconData.length === 0) {
        console.log('⚠️  No icons found. Let me try to capture the page content...');
        
        // Take a screenshot for manual inspection
        await this.page.screenshot({ 
          path: path.join(this.outputDir, 'page-screenshot.png') as `${string}.png`,
          fullPage: true 
        });
        console.log('📷 Screenshot saved for manual inspection');
        
        return [];
      }

      // Download each icon
      const downloadedIcons: DownloadedIcon[] = [];
      for (let i = 0; i < iconData.length; i++) {
        const icon = iconData[i];
        try {
          const filename = await this.downloadIcon(icon, i);
          if (filename) {
            downloadedIcons.push({ ...icon, filename });
            console.log(`✅ Downloaded: ${filename}`);
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          console.error(`❌ Failed to download icon ${i}:`, errorMessage);
        }
      }

      return downloadedIcons;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('❌ Error during scraping:', errorMessage);
      throw error;
    }
  }

  async downloadIcon(icon: IconData, index: number): Promise<string | null> {
    const { src, alt } = icon;
    
    // Generate filename
    const safeName = alt.toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || `icon-${index}`;
    
    // Handle data URLs (only SVG types)
    if (src.startsWith('data:')) {
      if (src.startsWith('data:image/svg+xml;utf8,')) {
        // Handle SVG data URL
        const svgData = decodeURIComponent(src.replace(/^data:image\/svg\+xml;utf8,/, ''));
        const filename = `${safeName}.svg`;
        const filepath = path.join(this.outputDir, filename);
        
        await fs.writeFile(filepath, svgData, 'utf8');
        return filename;
      } else if (src.startsWith('data:image/svg+xml;base64,')) {
        // Handle base64 encoded SVG data URL
        const base64Data = src.replace(/^data:image\/svg\+xml;base64,/, '');
        const svgData = Buffer.from(base64Data, 'base64').toString('utf8');
        const filename = `${safeName}.svg`;
        const filepath = path.join(this.outputDir, filename);
        
        await fs.writeFile(filepath, svgData, 'utf8');
        return filename;
      }
    } else {
      // Handle regular SVG URLs only
      try {
        const url = new URL(src, this.url);
        const ext = path.extname(url.pathname);
        
        // Only download if it's an SVG file
        if (ext === '.svg' || src.includes('.svg')) {
          const filename = `${safeName}.svg`;
          const filepath = path.join(this.outputDir, filename);
          
          await this.downloadFile(url.href, filepath);
          return filename;
        }
      } catch {
        console.error(`Invalid URL: ${src}`);
        return null;
      }
    }
    
    return null;
  }

  private downloadFile(url: string, filepath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const file = createWriteStream(filepath);
      
      https.get(url, (response) => {
        if (response.statusCode === 200) {
          response.pipe(file);
          file.on('finish', () => {
            file.close();
            resolve();
          });
        } else {
          reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
        }
      }).on('error', reject);
    });
  }

  async generateReport(downloadedIcons: DownloadedIcon[]): Promise<ScrapingReport> {
    const report: ScrapingReport = {
      timestamp: new Date().toISOString(),
      source: this.url,
      totalIcons: downloadedIcons.length,
      icons: downloadedIcons.map((icon: DownloadedIcon) => ({
        filename: icon.filename,
        alt: icon.alt,
        originalSrc: icon.src,
        dimensions: `${icon.width}x${icon.height}`,
        type: icon.isCanvas ? 'canvas' : icon.isBadge ? 'badge' : 'image'
      }))
    };

    const reportPath = path.join(this.outputDir, 'scraping-report.json');
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
    console.log(`📊 Report saved: ${reportPath}`);
    
    return report;
  }

  async cleanup(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      console.log('🧹 Browser closed');
    }
  }

  async run(): Promise<void> {
    try {
      await this.init();
      const downloadedIcons = await this.scrapeLogos();
      const report = await this.generateReport(downloadedIcons);
      
      console.log('\n🎉 Scraping completed!');
      console.log(`📁 Output directory: ${this.outputDir}`);
      console.log(`📊 Total icons downloaded: ${report.totalIcons}`);
      
      if (report.totalIcons > 0) {
        console.log('\n📋 Downloaded icons:');
        report.icons.forEach((icon) => {
          console.log(`  • ${icon.filename} (${icon.alt}) - ${icon.dimensions}`);
        });
      }
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('💥 Scraping failed:', errorMessage);
      process.exit(1);
    } finally {
      await this.cleanup();
    }
  }
}

// CLI usage
const args = process.argv.slice(2);
const options: ScraperOptions = {};

// Parse command line arguments
for (let i = 0; i < args.length; i += 2) {
  const key = args[i];
  const value = args[i + 1];
  
  switch (key) {
    case '--url':
      options.url = value;
      break;
    case '--output':
      options.outputDir = value;
      break;
    case '--headless':
      options.headless = value !== 'false';
      break;
  }
}

const scraper = new LogoScraper(options);
scraper.run();

export default LogoScraper;