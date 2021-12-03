import React, { useState, useEffect } from 'react';
import axios from 'axios';

const fetchData = async () => {
  try{
    return await axios.get('https://yellowdig-public-assets.s3.amazonaws.com/interview.json');
  }
  catch(err) {
    console.log(err)
  }
}
const renderPost = (posts, filter) => {
  if (posts.length > 0) {
    return posts.map((post) => {
      if (filter !== "") {
        if(post.topics.indexOf(filter) !== -1){
          return (
            <div className = "postContainer">
              <h3 className = "postTitle">{post.title}</h3>
              <p className = "postBody">{post.body}</p>
              {post.topics.map((topic) => {
                return (
                  <div className = "postTopics">{topic}</div>
                )
              })}
            </div>
          )
        }
      }else {
        return (
          <div className = "postContainer">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            {post.topics.map((topic) => {
              return (
                <button className = "postTopics">{topic}</button>
              )
            })}
          </div>
        )
      }
    })
  }
  return <h3>No Data Yet</h3>
}

export default () => {
  useEffect(() => {
    fetchData().then((data) => {
      setPostData(data.data)
      const uniqueTopics = []
      data.data.map(async (post) => {
        return post.topics.filter((topic) => { 
          console.log()
          if (uniqueTopics.indexOf(topic) === -1) {
            uniqueTopics.push(topic)
          }
        })
      })
      setFilterOption(uniqueTopics)
    })
  }, []);
  const [postData, setPostData] = useState([]);
  const [filterOption, setFilterOption] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("");
  const filter = () => {
    return filterOption.map((option) => {
      return (
        <a href="#" onClick = {() => { setCurrentFilter(option)}}>{option}</a>
      )
    })
  }
  return (
    <div>
      <div className="dropdown">
        <button className="dropbtn">Filter</button>
        <div className="dropdown-content">
          {filter()}
          <a onClick = {() => {setCurrentFilter("")}}>Remove Topics</a>
        </div>
      </div>
      {renderPost(postData, currentFilter)}
    </div>
  ) 

}
