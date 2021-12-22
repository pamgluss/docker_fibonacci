# Dockerized Fibonacci Calculator
Code for Docker &amp; Kubernetes course

## Overview
This is a very simple application that illustrates how to set up a multi container project that has automated deployment through Travis CI to AWS Elastic Beanstalk. 

## Dependencies
Requires Docker installed locally.

## Running Locally

`docker-compose up --build`

## Testing
TBD

## Contributing
TBD

## Notes

_Dockerrun.aws.json_ is an outdated method for building multiple containers on Elastic Beanstalk. Now, `Amazon Linux 2` platform will accept a docker-compose.yml file. I am including it for the exercise, but it would only be relevant until July 2022.
