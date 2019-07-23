<%@tag pageEncoding="UTF-8"%>

<%@attribute name="title"%>
<%@attribute name="body" fragment="true" %>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>${title}</title>

        <style>
            html, body {
                height: 100%;
            }
            
            html {
                font-family: sans-serif;
                font-size: 12pt;
            }

            h1 {
                color: crimson;
            }

            @media (min-width: 50em) {
                html {
                    background-image: url(https://unsplash.it/1024/768/?image=1073);
                    background-repeat: no-repeat;
                    background-position: center center;
                    background-size: cover;
                    
                    box-sizing: border-box;
                    padding-top: 2em;
                    padding-bottom: 2em;
                }

                main {
                    width: 40em;
                    margin: 0 auto;

                    background: white;
                    border: 1px solid #E5E5E5;
                    box-shadow: 1px 1px 2px #BFBFBF;

                    padding: 1em;
                }
            }
        </style>
    </head>
    <body>
        <main>
            <h1>${title}</h1>

            <jsp:invoke fragment="body"/>
        </main>
    </body>
</html>