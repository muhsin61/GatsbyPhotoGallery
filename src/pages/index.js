import React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"
import Img from "gatsby-image"
import axios from "axios"

import "./index.css"

const IndexPage = ({ data }) => {
//console.log(data)
//console.log(data.allFile.edges[0].node.childImageSharp)

let addNewPhoto = (e) => {
    //console.log(e.target.files[0]);
    const file = e.target.files[0];
    //console.log(file)
    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
  });
  toBase64(file).then(result=>{
    console.log("result " + result)
    console.log("name " + file.name)
    putPhoto()
        async function putPhoto(){
        await axios.put("https://api.github.com/repos/muhsin61/GatsbyPhotoGallery/contents/src/photos/", {
          message: "kuynfdıyrd" ,
          content: "rev"
        }, 
        {
          headers: {
            'Authorization': "token be59784e714b44194202b30a8c917b55ff32171d" 
          }
        }).then((res)=>{
          console.log("res")
          console.log(res)})
          .catch(err=>console.log(err))
      }
  })


  }

return (<div>
    <h1>Merhaba</h1>
    
    <input type="file" onChange={(e)=>addNewPhoto(e)}></input>

    <div className="photos">

      {data.allFile.edges.map(({node})=>{
        return <Img key={node.id} fluid={node.childImageSharp.fluid} />
      })}
      
    </div>
    
    <Link to="/page-2/">Go to page 2</Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
  </div>)
}


export const pageQuery = graphql`
{
  allFile(filter: {absolutePath: {regex: "//photos/"}}) {
    edges {
      node {
        id
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
}
`

export default IndexPage
