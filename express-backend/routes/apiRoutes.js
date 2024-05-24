const express = require('express');
const path = require('path')
const fs = require('fs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const validateFlag = require('../middleware/flagValidation');
const setToken = require('../middleware/setToken');
const config = require('../config');
const { FlagsTbl, ChallengesTbl, ProjectsTbl } = require('../models');

const router = express.Router();



function sha256sum(string) {
    return crypto.createHash('sha256').update(string).digest('hex');
}


router.get('/download/:fileName', (req, res) => {
    const fileName = path.basename(req.params.fileName);
    const reqFile = path.join(__dirname, '../files/', fileName);

    // Check if the requested file is within the intended directory
    const relative = path.relative(path.join(__dirname, '../files/'), reqFile);
    if (relative && !relative.startsWith('..') && !path.isAbsolute(relative)) {
        if (fs.existsSync(reqFile)) {
            res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
            res.sendFile(reqFile);
        } else {
            res.status(404).json({ success: false });
        }
    } else {
        res.status(400).json({ success: false, message: 'Invalid file path' });
    }
});


router.get('/challenges', setToken, async (req, res) => {

    try {

        const challs = await ChallengesTbl.find();
        
        // sent back already solved challenges
        decodedToken = jwt.verify(res.locals.jwt_token, config.SECRET_KEY);
        const solvedChalls = decodedToken.solved;
        
        res.status(200).json({
            challs: challs,
            solved: solvedChalls,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({error: err.message});
    }
});


router.post('/submit-flag', setToken, validateFlag, async (req, res) => {

    const flagSign = sha256sum(req.flag);
    
    try {

        const flagExists = await FlagsTbl.findOne({ ch_id: req.chal_id, flag_sign: flagSign });

        if (flagExists) {
            // send back token with updated solves.   
            const decodedToken = await jwt.verify(res.locals.jwt_token, config.SECRET_KEY);


            if(decodedToken.solved.includes(req.chal_id)){
                return res.json({ challenge_id: req.chal_id, error: 'already_solved'});
            }

            decodedToken.solved.push(req.chal_id);
            const newToken = jwt.sign(decodedToken, config.SECRET_KEY);
            res.cookie('GUID', newToken, { httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production'});

            return res.json({ challenge_id: req.chal_id, success: true });
        }

        return res.json({ challenge_id: req.chal_id, success: false});

    } catch(err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Error Submitting flag.' , success: false});
    }
});

module.exports = router;
