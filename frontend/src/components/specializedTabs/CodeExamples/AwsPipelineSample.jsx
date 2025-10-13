import React from 'react';

const AwsPipelineSample = () =>
    `version: 0.2
phases:
  install:
    runtime-versions:
      dotnet: 8.0
  pre_build:
    commands:
      - echo Restore started on \`date\`
      - dotnet restore
  build:
    commands:
      - echo Build started on \`date\`
      - dotnet build --configuration Release
      - dotnet test --configuration Release --no-build
  post_build:
    commands:
      - echo Publish started on \`date\`
      - dotnet publish -c Release -o ./publish
artifacts:
  files:
    - '**/*'
  base-directory: publish`;
export default AwsPipelineSample;
