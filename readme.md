# symfonycast course downloader!

Un scrapercito para descargar un curso desde [Symfonycast](https://symfonycasts.com).

Se creará en la raíz un folder llamado `course` donde contandrá todos los cursos que se descarguen. Se genera una carpeta para cada curso y lección donde descargará 2 archivos (idealmente). Uno será el video y el otro los subtítulos `<lesson-name>.mp4 y <lesson-name>.vtt` respectivamente.

## instrucciones

### Lo básico!

* clona el repo
* crea un .env con la siguiente estructura
```env
USERNAME=<correo>
PASSWORD=<contraseña>
```
* `npm install`
* `npm run start course <course-url>`


### Cómo ejecutable!

* clona el repo
* crea un .env con la siguiente estructura
```env
USERNAME=<correo>
PASSWORD=<contraseña>
```
* `npm install`
* `npm run build`
* `npm i -g` (puede uqe necesites sudo...)

Luego ejecuta `symfonycastscraper course <course-url>`! Ahora vaya por un café mientras se descarga su curso!

**Beneficio de hacerlo de está manera es que los cursos se guardarán en una carpeta `course` que se creará en la ubicación donde se ejecuté el comando!! OJO AHÍ!!**

## todo
* agregar tests!
* hacer el código más lindo (Aún no cacho mucho de node :))
* agregar comando para descargar lecciónes individuales.

