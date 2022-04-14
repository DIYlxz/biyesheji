import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
const ffmpeg = createFFmpeg({ log: true })

async function test () {
    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load()
    }
    ffmpeg.setProgress(({ ratio }) => {
      console.log(ratio)
      /*
       * ratio is a float number between 0 to 1.
       */
    })
    ffmpeg.FS('writeFile', 'overlay.png', await fetchFile('./overlay.png'))
    ffmpeg.FS('writeFile', 'a.mp4', await fetchFile(this.fileObj))
    // ffmpeg.FS('writeFile', 'a.mp4', await fetchFile('./a.mp4'))
    await ffmpeg.run(
      '-i',
      'a.mp4',
      '-i',
      'overlay.png',
      '-filter_complex',
      "[0:v][1:v] overlay=10:10:enable='between(t,0,20)'",
      'b.mp4'
    )
    console.info(ffmpeg.FS('readFile', 'b.mp4'))
    console.info(fs)
    this.offerFileAsDownload('b.mp4', ffmpeg)
    // await fs.promises.writeFile('./test.mp4', ffmpeg.FS('readFile', 'b.mp4'))
    process.exit(0);
}
