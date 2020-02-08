import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { List, Avatar, Button, Skeleton, Icon, Divider ,Typography, } from 'antd';


import reqwest from 'reqwest';
import logo from './img1.png';
import logoeq1 from './img/clubsNA/EST.png';


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
<div>
      <div class="ccc">
      <Title>Standings</Title>
    <Title class="h2"> Position&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Team &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Points&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   MatchPlayed &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Wins&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Draws&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Losses&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Goals For&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Goals Against&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Goal Difference  </Title>-
  
    -
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
              
                                     /*  Pos-Team-Pts-MP-W-D-L-GF-GA-GD                                       */
        //ant-card-grid ant-card-grid-hoverable ant-card ant-card-bordered ant-card-hoverable

        
        title={
        <a  >
          
          
          <span><Divider type="vertical" /></span>
          <span  >{item.name.last}</span>
           <span ><img src={logoeq1}  /></span> 
          <span>{item.name.first,item.name.last}</span>
          <span>{item.name.first}</span>
          <span>{item.name.first}</span>
          <span>{item.name.first}</span>
          <span>{item.name.first}</span>
          <span>{item.name.first}</span>
          <span>{item.name.first}</span>
          <span>{item.name.first}</span>
        

          </a>
        
        }

             

  
              />
         
            </Skeleton>
            
            
          </List.Item>
        )}
      />
    </div>);
  }
}









         


