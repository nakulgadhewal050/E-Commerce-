import User from '../model/userModel.js';


export const getCurrentUser = async (req, res) => {
    try {
        // Check if userId exists (from auth middleware)
        if (!req.userId) {
            return res.status(401).json({ 
                success: false,
                message: "Authentication required" 
            });
        }

        let user = await User.findById(req.userId).select('-password');
        
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: "User not found" 
            });
        }

        return res.status(200).json({
            success: true,
            user: user,
            message: "User data fetched successfully"
        });
        
    } catch (error) {
        console.log("Error in getCurrentUser:", error);
        return res.status(500).json({ 
            success: false,
            message: "Server error while fetching user data", 
            error: error.message 
        });
    }
}
 

export const getAdmin = async (req, res) => {
    try {
        let adminEmail = req.adminEmail;

         
        if (!adminEmail){
            return res.status(401).json({ message: "Admin not found " });
        }

        return res.status(200).json({ 
            email: adminEmail,
            role: "admin"

         });

    } catch (error) {
        return res.status(500).json({ message: "Admin fetch error", error: error.message });
    }
}