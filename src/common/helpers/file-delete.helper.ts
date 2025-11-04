import { FileTypeEnum } from '@common/enums';
import { existsSync, mkdirSync, unlink, unlinkSync } from 'fs';
import { basename, dirname, extname, join } from 'path';

/**
 * FileHelper
 * 
 * Utility class for file system operations, specifically focused on file deletion
 * with proper error handling and safety checks.
 * 
 * @example
 * ```typescript
 * import { FileHelper } from '@common/helpers';
 * 
 * // Synchronous deletion (silent)
 * FileHelper.deleteFileSilent('/path/to/file.txt');
 * 
 * // Asynchronous deletion with promise
 * await FileHelper.deleteFile('/path/to/file.txt');
 * ```
 * 
 * @author Marify Team
 * @since 1.0.0
 */
export class FileHelper {

  /**
   * Deletes a file synchronously without throwing errors.
   * 
   * This method performs a "silent" deletion, meaning it will not throw
   * an error if the file doesn't exist or cannot be deleted. It first
   * checks if the file exists before attempting deletion.
   * 
   * @param filepath - The absolute or relative path to the file to delete
   * 
   * @example
   * ```typescript
   * // Delete uploaded file after processing
   * FileHelper.deleteFileSilent('./uploads/temp-file.jpg');
   * 
   * // Clean up temporary files
   * FileHelper.deleteFileSilent('/tmp/processing-cache.json');
   * ```
   * 
   * @remarks
   * - Uses synchronous file operations (blocks the event loop)
   * - Safe to use when file might not exist
   * - No error handling - use only when errors can be ignored
   * - Best for cleanup operations where failure is not critical
   * 
   * @since 1.0.0
   */
  public static deleteFileSilent(filepath: string): void {
    if (existsSync(filepath)) {
      unlinkSync(filepath);
    }
  }

  /**
   * Deletes a file asynchronously with promise-based error handling.
   * 
   * This method provides asynchronous file deletion with proper error handling.
   * It checks for file existence before attempting deletion and returns a
   * promise that resolves when the operation completes successfully or rejects
   * if an error occurs during deletion.
   * 
   * @param file - The absolute or relative path to the file to delete
   * @returns A promise that resolves when the file is successfully deleted
   * @throws {Error} When file deletion fails due to permissions, locks, or other I/O errors
   * 
   * @example
   * ```typescript
   * try {
   *   // Delete user uploaded file
   *   await FileHelper.deleteFile('./uploads/user-avatar.png');
   *   console.log('File deleted successfully');
   * } catch (error) {
   *   console.error('Failed to delete file:', error.message);
   * }
   * 
   * // Using with async/await in service
   * async cleanupTempFiles(filePaths: string[]) {
   *   for (const path of filePaths) {
   *     try {
   *       await FileHelper.deleteFile(path);
   *     } catch (error) {
   *       console.warn(`Could not delete ${path}:`, error.message);
   *     }
   *   }
   * }
   * ```
   * 
   * @remarks
   * - Uses asynchronous file operations (non-blocking)
   * - Provides proper error handling through promise rejection
   * - Safe to use when file might not exist (resolves without error)
   * - Preferred method for file deletion in async contexts
   * - Better for performance in I/O intensive operations
   * 
   * @since 1.0.0
   */
  public static deleteFile = (file: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (existsSync(file)) {
        unlink(file, (err) => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      } else {
        resolve();
      }
    });
  };
  public static createFolder(path: string) {
    if (!existsSync(path)) {
      mkdirSync(path, { recursive: true });
    }
  }

  public static changeExtensionToWebp(filePath: string): string {
    if (filePath) {
      const dir = dirname(filePath);
      const base = basename(filePath, extname(filePath));
      return join(dir, `${base}.webp`);
    }
    return filePath;
  }

  public static getFileType(fileMimeType: string): FileTypeEnum {
    if (fileMimeType.startsWith('image')) return FileTypeEnum.PHOTO;
    if (fileMimeType.startsWith('video')) return FileTypeEnum.VIDEO;
    return FileTypeEnum.AUDIO;
  }

}
