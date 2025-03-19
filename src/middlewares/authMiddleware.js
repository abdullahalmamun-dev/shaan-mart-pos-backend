import jwt from 'jsonwebtoken';
import { secretKey } from '../../secrectKeyJWT';

const verifyToken = (req, res, next) => {
    // Get token from Authorization header (Bearer <token>)
    const token = req.headers['authorization']?.split(' ')[1];

    // If no token is provided, return an error
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify the token using your JWT secret key
        const decoded = jwt.verify(token, secretKey);

        // Attach the decoded user info to the request object
        req.user = decoded;
        
        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        // If token is invalid or expired
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export default verifyToken;
