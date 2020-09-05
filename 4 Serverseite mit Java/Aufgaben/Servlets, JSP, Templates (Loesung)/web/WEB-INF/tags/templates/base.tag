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
                text-shadow: 1px 1px 1px rgba(0,0,0, 0.5);
            }

            .error {
                color: red;
                font-weight: bold;
            }
            
            table, input {
                width: 100%;
            }
            
            td {
                padding: 0.5em;
            }

            @media (min-width: 50em) {
                html {
                    /* https://pixabay.com/de/popcorn-snack-kino-lebensmittel-1433327/ */
                    background-image: url(popcorn-1433327_1280.jpg);
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