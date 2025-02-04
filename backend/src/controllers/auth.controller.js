
import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../model/user.model.js"
import bcrypt from "bcryptjs"
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "all feilds are required" })
        }
        //hash password
        if (password.length < 6) {
            return res.status(400).json({ message: "Password length must be  6 " })
        }
        const user = await User.findOne({ email })
        if (user) return res.status(400).json({ message: "Already exists" })


        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);


        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })

        if (newUser) {
            //generate JWt token here
            await newUser.save();
            generateToken(newUser._id, res)


            res.status(200).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic

            });


        } else {
            res.status(400).json({ message: "invalid data" })
        }


    } catch (err) {
        console.log("Error in signup controller", err.message);
        res.status(500).json({ message: "internal serve error" });
    }


};


export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid Password " })
        }

        generateToken(user._id, res)
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        })
    } catch (err) {
        console.log("Erro in login Controller", err.message);
        res.status(500).json({ message: "internal server" })

    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "logged out successfully" })
    } catch (err) {
        console.log("Error in logout contoller", err.message);
        res.status(500).json({ message: "Internal server Error" });
    }
};


export const updateProfile=async(req,res)=>{
   try{
      const {profilePic}=req.body
      const userId=req.user._id;

      if(!profilePic)
      {
        return res.status(400).json({message:"Profile pic is required"})
      }

     const uploadResponse= await cloudinary.uploader.upload(profilePic)
     const updatedUser= awit User.findByIdAndDelete()
   }
   catch(err)
   {

   }
}