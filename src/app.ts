import define from "@/libs/define";
import express from 'express';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import morgan from 'morgan';
import fs from "fs";


const app = express();
app.enable("trust proxy");


// view engine setup
app.set('views', path.join(__dirname, 'views'));

// swagger document setup
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BG Programming API Document',
      version: define.VERSION,
    },
  },
  apis: [
    './build/api-doc-components/*',
    './build/api/*',

  ],
};
const openapiSpecification = swaggerJsdoc(options);
const swaggerUIOptions = {
  customCss: '.swagger-ui .topbar { display: none }',
  customCssUrl: "/assets/css/theme-flattop.css",
  customSiteTitle : "BGProgramming API Document",
  customfavIcon : "/favicon.png"
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification, swaggerUIOptions));






// customize debug print logging
morgan.format('mydate', function() 
{   
    "use strict";
    const t = new Date();
    let d = [t.getFullYear(), t.getMonth() + 1, t.getDate()].join('-');
    d += ' ' + t.toLocaleTimeString();
    return d;
});



if( process.env.AWS || process.env.COFFEE) {
  app.use(morgan(
    '[:mydate] ' +
    ':remote-addr ' +
    ':method ' +
    ':url '  +
    ':status ' +
    ':response-time ms '
  ));
} else {
  app.use(morgan(
    '\x1b[2m\x1b[30m[:mydate] ' +
    '\x1b[0m\x1b[31m:remote-addr ' +
    '\x1b[35m:method ' +
    '\x1b[30m:url '  +
    '\x1b[1m\x1b[34m:status ' +
    '\x1b[0m\x1b[30m:response-time ms '
  ));
}



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));



import main from "./main";
main(app);



// catch 404 and forward to error handler
// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use(function(req : any, res : any) {
  console.log("=========== 404 Not Found ============ ");
  const firstUrl = req.url.split("/")[1];
  let filePath = "";
  let strHtml = "";

  if( firstUrl === "admin") {
    filePath = path.join(__dirname, 'public', 'admin', 'index.html');
  } else {
    filePath = path.join(__dirname, 'public', 'index.html');
  }

  strHtml = fs.readFileSync(filePath, 'utf8');
  return res.send( strHtml );
});


// error handler
// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use(function(err : any, req : any, res : any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;

