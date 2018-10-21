# symfonycast course downloader!

Un scrapercito para descargar un curso desde [Symfonycast](https://symfonycasts.com).

Se creará en la raíz un folder llamado `course` donde contandrá todos los cursos que se descarguen. Se genera una carpeta para cada curso y lección donde descargará 2 archivos (idealmente). Uno será el video y el otro los subtítulos `<lesson-name>.mp4 y <lesson-name>.vtt` respectivamente.

## instrucciones
* clona el repo
* crea un .env con la siguiente estructura
```env
USERNAME=<correo>
PASSWORD=<contraseña>
```
* `npm install`
* `npm run start course <course-url>`

## todo
* agregar tests!
* hacer el código más lindo (Aún no cacho mucho de node :))
* hacerlo ejecutable (Terminarlo...)
