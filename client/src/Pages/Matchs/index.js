import React from 'react';
import './matchs.css';
import { List, Avatar, Button, Skeleton, Icon, Divider ,Typography, } from 'antd';


import reqwest from 'reqwest';
import logo from './img1.png';
import logoeq1 from './img/clubsNA/EST.png';
import logoeq2 from './img/clubsNA/CA.png';


const { Title } = Typography;
const count = 4;
 const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;


export default class LoadMoreList extends React.Component {
   
  state = {
    initLoading: true,
    loading: false,
    data: [],
    list: [],
  
  };

  componentDidMount() {
    this.getData(res => {
      this.setState({
        initLoading: false,
        data: res.results,
        list: res.results,
      });
    });
  }

  getData = callback => {
    reqwest({
      url: fakeDataUrl,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: res => {
        callback(res);
      },
    });
  };

  onLoadMore = () => {
    this.setState({
      loading: true,
      list: this.state.data.concat([...new Array(count)].map(() => ({ loading: true, name: {} }))),
    });
    this.getData(res => {
      const data = this.state.data.concat(res.results);
      this.setState(
        {
          data,
          list: data,
          loading: false,
        },
        () => {

          window.dispatchEvent(new Event('resize'));
        },
      );
    });
  };



  
  render() {
    

    const { initLoading, loading, list } = this.state;


    const loadMore =
      !initLoading && !loading ? (
        
        
        
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
            
          }}
        >
          <Button onClick={this.onLoadMore}>loading more</Button>
        </div>
      ) : null;

    return (
        <div className="matchs">
             <div class="ccc">
        <Title>First Team Results</Title>
        </div>
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        
        renderItem={item => (
           
          <List.Item
           >
    
            <Skeleton avatar title={false} loading={item.loading} active>
  
              <List.Item.Meta
        title={
        <a class="ant-card-grid ant-card-grid-hoverable" >
          <span  >{item.name.last}</span><Divider type="vertical" />
           <span ><img src={logo}  /></span> <Divider type="vertical" />
          <span>{item.name.last}</span><Divider type="vertical" />
          <span>{item.name.last}</span>
          <span> <img src={logoeq1}  /></span> 
          
          <span class="carre" >{item.name.last}</span><span class="carre"><Icon   type="minus" /></span>
          <span class="carre" >{item.name.last}</span>
         
          <span> <img src={logoeq2}  /></span>
          <span>{item.name.last}</span>
        <span ><Icon type="clock-circle" />{"   "}{item.name.first}</span>  
          <Button type="primary"  class="ccccc" size={150}>
            match Highlights 
            </Button> 

          </a>
        
        }

             

  
              />
         
            </Skeleton>
            
            
          </List.Item>
        
        )}
      />
     </div> );
  }
}





         


