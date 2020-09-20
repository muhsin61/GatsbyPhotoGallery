import React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"
import Img from "gatsby-image"
import "./index.css"

const IndexPage = ({ data }) => {
console.log(data)
console.log(data.allFile.edges[0].node.childImageSharp)
  
let test = () => {
  alert("clicked")
}

return (<div>
    <h1 onClick={test}>Merhaba</h1>

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
