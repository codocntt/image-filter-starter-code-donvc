import { Router, Request, Response } from 'express';
import { deleteLocalFiles, filterImageFromURL } from '../../../util/util';

const router: Router = Router();

// API to filter the image URL
router.get('/filteredimage', async (req : Request, res : Response) => {
    const { image_url } = req.query;

    if (!image_url) {
        return res.status(400).send('Invalid Image URL');
    }

    const filteredImage = await filterImageFromURL(image_url);

    if (!filteredImage) {
        return res.status(500).send('Something went wrong!');
    }

    res.status(200).sendFile(filteredImage);

    return res.on('Finished', () => {
        deleteLocalFiles([filteredImage]);
    });
});

export const ImageRouter: Router = router;
