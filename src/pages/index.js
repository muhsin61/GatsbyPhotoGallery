import React,{ useState } from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import axios from "axios"

import "./index.css"

const IndexPage = ({ data }) => {

  const [input, senInput] = useState("")
  const [show, setShow] = useState(false)

  const [bigImg, setBigImg] = useState(false)
  const [bigImgSrc, setBigImgSrc] = useState("")

  const [toastrs,setToastrs] = useState([false,"err","test"])

  const toaster = (header,message) => {
    setTimeout(()=>{
      setToastrs([false,header,message])
    },2000)
    setToastrs([true,header,message])
  }

  let addNewPhoto = (e) => {
    if(input !== ""){
      console.log("çalıştı")
      const file = e.target.files[0];
      const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
      toBase64(file).then(result => {
        putPhoto()
        async function putPhoto() {
          await axios.put(`https://api.github.com/repos/muhsin61/GatsbyPhotoGallery/contents/src/photos/${file.name}`, {
            message: new Date,
            content: result.replace(/^(.+,)/, '')
          },
            {
              headers: {
                'Authorization': `token ${input}`
              }
            }).then((res) => {
              console.log(res)
              toaster("doğru","resim eklendi")
              setShow(false)
            })
            .catch(err => toaster("hata","gönderme hatası"))
        }
      })
    }else{
      toaster("hata","token yok")
    }
  }
  let showPhoto = (imgSrc) => {
    setBigImgSrc(imgSrc.src)
    setBigImg(true)
  }
  return (
    <div>

      <div className="addNewPhotoContainer" style={{ display: show ? "flex" : "none" }}>
        <div className="backHome" onClick={() => setShow(false)}></div>
        <div className="addNewPhoto">
          <input placeholder="token" type="text" value={input} onChange={(e) => senInput(e.target.value)}></input><br />
          <input type="file" onChange={(e) => addNewPhoto(e)}></input>
        </div>
      </div>
      <div>
        <h1 >Fotoğraf galerim</h1>
        <p className="showNewPhoto" onClick={() => setShow(true)} >Yeni Fotoğraf Ekle</p>
      </div>

      <div className="photos">
        {data.allFile.edges.map(({ node }) => {
          return <div key={node.id} className="img" onClick={() => showPhoto(node.childImageSharp.fluid)}><Img className="img2" fluid={node.childImageSharp.fluid} /></div>
        })}
      </div>
      {bigImg ? (
        <div className="bigImg">
          <div className="imgBack" onClick={() => setBigImg(false)}></div>
          <img className="bigimg" src={bigImgSrc} alt="there is  no img" />
        </div>
      ) : null}
      {
        toastrs[0] ? <div className="toastr"><h2>{toastrs[1]}</h2><p>{toastrs[2]}</p></div> : null
      }
      <footer>
        <p>Kodlara <a href="https://github.com/muhsin61/GatsbyPhotoGallery">Github</a> üzerinden ulaşabilrisiniz.</p>
      </footer>
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
