import {getSession} from "next-auth/react";
import {NextPageContext} from "next";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";
import InfoModel from "@/components/InfoModel";
import useInfoModel from "@/hooks/useInfoModel";


export async function getServerSideProps(context: NextPageContext)
{
    //Fetch Session On Client
    const session = await getSession(context);
    
    //If Session Doesn't Exist/Redirect
    if(!session){
        return {
            redirect: {
                destination: "/auth",
                permanent:false,
            }
        }
    }
    
    return {
        props:{}
    }
}
export default function Home() {
    const {data: movies = [] } = useMovieList();
    const {data: favorites = []} = useFavorites();
    const {isOpen, closeModel} = useInfoModel();
    
  return (
      <>
          <InfoModel visible={isOpen} onClose={closeModel}/>
          <Navbar />
          <Billboard/>
          <div className="pb-40">
              <MovieList title="Trending Now" data={movies}/>
              <MovieList title="My Favorites" data={favorites}/>
          </div>
      </>
  )
}
