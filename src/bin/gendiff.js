#!/usr/bin/env node
import commander from 'commander';
import gendiff from '..';

commander
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig, cmd) => {
    console.log(gendiff(firstConfig, secondConfig, cmd.format));
  })
  .parse(process.argv);
