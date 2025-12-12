// generate-tree.js
const fs = require('fs');
const path = require('path');

const IGNORE = [
  'node_modules',
  '.git',
  '.next',
  'dist',
  'build',
  '*.log',
  '*.tmp',
  '.DS_Store',
  'package-lock.json',
  'yarn.lock',
  'pnpm-lock.yaml',
    ".open-next",
    ".vscode",
    ".wrangler"
];

function shouldIgnore(name) {
  return IGNORE.some(pattern => {
    if (pattern.includes('*')) {
      const regex = new RegExp(pattern.replace('*', '.*'));
      return regex.test(name);
    }
    return name === pattern;
  });
}

function generateTree(dir, prefix = '', isLast = true) {
  const items = fs.readdirSync(dir)
    .filter(item => !shouldIgnore(item))
    .sort((a, b) => {
      // 目录在前，文件在后
      const aIsDir = fs.statSync(path.join(dir, a)).isDirectory();
      const bIsDir = fs.statSync(path.join(dir, b)).isDirectory();
      if (aIsDir && !bIsDir) return -1;
      if (!aIsDir && bIsDir) return 1;
      return a.localeCompare(b);
    });

  let result = '';

  items.forEach((item, index) => {
    const itemPath = path.join(dir, item);
    const isDirectory = fs.statSync(itemPath).isDirectory();
    const isLastItem = index === items.length - 1;

    // 当前行的前缀
    const linePrefix = prefix + (isLast ? '    ' : '│   ');
    
    // 连接符号
    const connector = isLastItem ? '└── ' : '├── ';
    
    // 当前项目
    const icon = isDirectory ? '📁 ' : '📄 ';
    result += prefix + connector + icon + item + '\n';

    // 如果是目录，递归处理
    if (isDirectory) {
      result += generateTree(itemPath, linePrefix, isLastItem);
    }
  });

  return result;
}

// 生成树形结构
const tree = generateTree('.');
console.log('项目目录结构：\n');
console.log('.');
console.log(tree);

// 保存到文件
fs.writeFileSync('PROJECT_STRUCTURE.md', `# 项目目录结构\n\n\`\`\`\n.\n${tree}\n\`\`\``);