#!/usr/bin/env node

import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');

const args = process.argv.slice(2);
const command = args[0];
const skillName = args[1];
const isLocal = args.includes('--local') || args.includes('-l');

async function listSkills() {
  const { readdirSync } = await import('fs');
  const skillsDir = resolve(rootDir, 'skills');

  console.log('Available skills:\n');

  try {
    const skills = readdirSync(skillsDir).filter(s => !s.startsWith('.'));
    if (skills.length === 0) {
      console.log('  No skills found');
      return;
    }
    for (const skill of skills) {
      const skillMd = resolve(skillsDir, skill, 'SKILL.md');
      let description = '';
      try {
        const { readFileSync } = await import('fs');
        const content = readFileSync(skillMd, 'utf-8');
        const match = content.match(/^---\nname: [^\n]+\ndescription: (.+)/);
        if (match) description = match[1];
      } catch {}
      console.log(`  - ${skill.padEnd(20)} ${description}`);
    }
  } catch {
    console.log('  No skills found');
  }
}

async function runInstall() {
  const { execSync } = await import('child_process');

  if (!skillName) {
    console.error('Usage: npx skills install <skill-name> [--local]');
    console.error('Available skills:');
    const skillsDir = resolve(rootDir, 'skills');
    const { readdirSync } = await import('fs');
    try {
      const skills = readdirSync(skillsDir).filter(s => !s.startsWith('.'));
      skills.forEach(s => console.log(`  - ${s}`));
    } catch {}
    process.exit(1);
  }

  console.log(`Installing skill: ${skillName}...`);

  const srcSkillDir = resolve(rootDir, 'skills', skillName);
  const srcSkillMd = resolve(srcSkillDir, 'SKILL.md');
  const srcReadme = resolve(srcSkillDir, 'README.md');

  const { existsSync } = await import('fs');
  if (!existsSync(srcSkillMd)) {
    console.error(`❌ Skill "${skillName}" not found in skills/`);
    process.exit(1);
  }

  // Determine target skills path
  let destSkillsDir;
  if (isLocal) {
    destSkillsDir = resolve(rootDir, '.claude', 'skills');
  } else {
    const homeDir = process.env.HOME || process.env.USERPROFILE;
    destSkillsDir = resolve(homeDir, '.claude', 'skills');
  }

  // Ensure directory exists
  execSync(`mkdir -p "${destSkillsDir}"`, { stdio: 'inherit' });

  const destSkillDir = resolve(destSkillsDir, skillName);
  const destSkillMd = resolve(destSkillDir, 'SKILL.md');
  const destReadme = resolve(destSkillDir, 'README.md');

  // Copy files
  execSync(`mkdir -p "${destSkillDir}"`, { stdio: 'inherit' });
  execSync(`cp "${srcSkillMd}" "${destSkillMd}"`, { stdio: 'inherit' });
  if (existsSync(srcReadme)) {
    execSync(`cp "${srcReadme}" "${destReadme}"`, { stdio: 'inherit' });
  }

  console.log(`✅ Skill "${skillName}" installed successfully!`);
  if (isLocal) {
    console.log(`   -> ${destSkillMd}`);
  }
}

if (command === 'install') {
  runInstall().catch(err => {
    console.error('Installation failed:', err);
    process.exit(1);
  });
} else if (command === 'list') {
  listSkills();
} else {
  console.log('Usage: npx skills <command>');
  console.log('');
  console.log('Commands:');
  console.log('  install <skill-name>  Install a skill (default: global ~/.claude/skills/)');
  console.log('  install --local       Install to project .claude/skills/');
  console.log('  list                  List available skills');
  process.exit(1);
}
