/*
    Validates if flag match required format using regular expression.
*/

function flagValidationMWARE(req, res, next){

    try{
        const { chal_id, flag } = req.body;

        if (!chal_id || !flag) {
            res.status(400).json({ message: 'Missing parameters', success: false });
            return;
        }

        const re = new RegExp("^(rctf|glitch)\{[a-zA-Z0-9!@_$.]{1,45}\}$");
        const match = re.test(flag);

        if (match) {
            req.flag = flag;
            req.chal_id = chal_id;

            next();
            return
        }

        res.status(400).json({  message: 'Invalid flag format', success: false });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error, check back later' , success: false});
    }
    
}

module.exports = flagValidationMWARE;
