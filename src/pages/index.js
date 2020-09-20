import React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"
import Img from "gatsby-image"
import axios from "axios"

import "./index.css"

const IndexPage = ({ data }) => {
  let addNewPhoto = (e) => {
    const file = e.target.files[0];
    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
    toBase64(file).then(result => {
      console.log("result " + result)
      console.log("name " + file.name)
      putPhoto()
      async function putPhoto() {
        await axios.put(`https://api.github.com/repos/muhsin61/GatsbyPhotoGallery/contents/src/photos/${file.name}`, {
          message: "kuynfdıyrd",
          content: result.replace(/^(.+,)/, '')
        },
          {
            headers: {
              'Authorization': "token "
            }
          }).then((res) => {
            console.log("res")
            console.log(res)
          })
          .catch(err => console.log(err))
      }
    })
  }

  return (
  <div>
    <h1>Fotoğraf galerim</h1>
      <div>
        <input type="text"></input>
        <input type="file" onChange={(e) => addNewPhoto(e)}></input>
        <p>Seçtiğiniz anda eklenecekir.</p>
      </div>

    <div className="photos">

      {data.allFile.edges.map(({ node }) => {
        return <Img key={node.id} fluid={node.childImageSharp.fluid} />
      })}

    </div>
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
