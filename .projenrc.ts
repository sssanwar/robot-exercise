import { typescript } from 'projen'
import { ArrowParens } from 'projen/lib/javascript'

const project = new typescript.TypeScriptAppProject({
  defaultReleaseBranch: 'main',
  name: 'robot-exercise',
  authorName: 'Stephen Anwar',
  authorEmail: 'stephen.anwar@gmail.com',
  projenrcTs: true,
  depsUpgrade: false,
  prettier: true,
  prettierOptions: {
    settings: {
      arrowParens: ArrowParens.AVOID,
      printWidth: 120,
      semi: false,
      singleQuote: true,
    },
  },
  deps: [],
  devDeps: ['jest-mock-extended@^3.0.5'],
})

project.addTask('execute', { exec: 'ts-node src/index.ts' })

project.synth()
