import { Response } from 'express';

// TODO: this is bare minimum.
export const handleError = (err: Error, resp: Response): void => {
  resp.status(500).json({
    message: 'Failed to process article',
    reason: err.message
  });
};
