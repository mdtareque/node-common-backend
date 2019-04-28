### AWS Console
https://219560220147.signin.aws.amazon.com/console
Administrator 

### RDS Database Instance (mysql)
- jobportalDB
- commondb

### ElasticBeanStalk app
- testEB ( has the nodejs+express+mysql application code) [endpoint](http://Testeb-env.kaejdd6e5t.ap-south-1.elasticbeanstalk.com)

### Development
- git clone the project
- make code changes
- `npm run start` to test locally
- Create ElasticBeanStalk compatible archive using command - `zip ../nodejs-v4.zip -r * .[^.]*- `
- Upload and deploy in ElasticBeanStalk

### node modules 
- express
- body-parser
- mysql
- morgan (just for loggin)

### Testing steps
- use Postman native app to fire http requests

