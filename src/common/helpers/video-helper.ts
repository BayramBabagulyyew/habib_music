import { spawn } from 'child_process';
import * as ffmpeg from 'fluent-ffmpeg';
import { basename, dirname } from 'path';

export class VideoHelper {
  public static async getVideoDuration(filePath: string): Promise<number> {
    return new Promise((resolve, reject) => {
      const ffprobeProcess = spawn('ffprobe', [
        '-v',
        'error',
        '-show_format',
        '-show_entries',
        'format=duration',
        filePath,
      ]);

      let duration = '';

      ffprobeProcess.stdout.on('data', (data) => {
        const lines = data.toString().trim().split('\n');
        const durationLine: string | undefined = lines.find((line: string) => line.startsWith('duration='));

        if (durationLine) {
          duration = durationLine.split('=')[1];
        }
      });

      ffprobeProcess.stderr.on('data', (data) => {
        reject(new Error(`Error getting video duration: ${data}`));
      });

      ffprobeProcess.on('close', (code) => {
        if (code === 0) {
          const parsedDuration = parseInt(duration);
          if (!isNaN(parsedDuration)) {
            resolve(parsedDuration);
          } else {
            reject(new Error('Failed to parse video duration'));
          }
        } else {
          reject(new Error(`ffprobe exited with code: ${code}`));
        }
      });
    });
  }

  public static async captureFirstFrame(
    videoPath: string,
    outputImagePath: string,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      ffmpeg(videoPath)
        .screenshots({
          timestamps: [0], // Capture the first frame
          filename: basename(outputImagePath), // Output filename
          folder: dirname(outputImagePath), // Output directory
        })
        .on('end', () => {
          console.log(`First frame captured at ${outputImagePath}`);
          resolve(outputImagePath);
        })
        .on('error', (err: Error) => {
          console.error('Error capturing the first frame:', err);
          reject(err);
        });
    });
  }

}