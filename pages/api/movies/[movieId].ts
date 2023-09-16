import {NextApiRequest,NextApiResponse} from "next";
import prismadb from "@/lib/prismadb";
import ServerAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res:NextApiResponse){
    if(req.method != 'GET'){
        return res.status(400).end()
    }
    
    try {
        await ServerAuth(req,res);
        
        const {movieId} = req.query;
        
        if(typeof movieId != "string"){
            console.log("Taken Id:",movieId)
            throw new Error("Invalid , Not String")
        }

        if(!movieId){
            throw new Error("Invalid ID, No Id Given")
        }
        
        const movie = await prismadb.movie.findUnique({
            where:{
                id:movieId
            }
        });
        
        if(!movie)
        {
            throw new Error("Invalid ID, No Movie With Given Id")
        }
        
        return res.status(200).json(movie);
    }catch (error){
        console.log(error);
        return res.status(400).end();
    }
}