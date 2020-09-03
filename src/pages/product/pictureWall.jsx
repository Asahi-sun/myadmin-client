import React from 'react'
import PropTypes from 'prop-types'
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { reqDeletePicture } from '../../api/index'

const BASE_IMG = 'http://localhost:5000/upload/'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends React.Component {


  static propTypes = {
    imgs:PropTypes.array
  }

  state = {
    previewVisible: false,  //表示是否显示大图预览
    previewImage: '',  // 大图的url或者base64值
    previewTitle: '',
    fileList: [],
  }

  UNSAFE_componentWillMount () {
    // 根据传入的imgs生成fileList并更新
    const imgs = this.props.imgs
    if (imgs && imgs.length>0) {
      const fileList = imgs.map((img, index) => ({
        uid: -index, // 唯一标识
        name: img, // 文件名
        status: 'done', // 状态有：uploading done error removed
        url: BASE_IMG + img
      }))
      this.setState({ fileList })
    }
  }

  /**
   * 获取所有已上传图片文件名的数组
   */
  getImgs = () => this.state.fileList.map( file => file.name)

  handleCancel = () => this.setState({ previewVisible: false });

  /**
   * 进行大图预览的回调函数
   * file：当前选择的图片对应的file
   * @param {*} file 
   */
  handlePreview = async file => {
    if (!file.url && !file.preview) { //如果file没有没有图片url，只进行一次base64处理
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };


  /**
   * 在file的状态发生改变的监听回调 
   * fiel:当前操作（上传/删除）的file
   */
  handleChange = async ({ file,fileList }) => {
    //file与fileList中最后一个file代表同个图片不同对象
    console.log('handleChange()',file.status,file === fileList[fileList.length-1])
    // 如果上传成功
    if(file.status === 'done'){
      // 将数组最后一个file保存待file变量
      file = fileList[fileList.length-1]
      // 取出响应数据中的图片文件名和url
      const { name, url } = file.response.data
      // 保存在数据对象中
      file.name = name
      file.url = url
    }else if(file.status === 'removed'){ //删除图片
      console.log(file.name,'file.name')
      const result = await reqDeletePicture(file.name)
      console.log(result.status)
      if(result.status === 0){
        message.success('删除图片成功！')
      }else{
        message.error('删除图片失败！')
      }
    }

    // 更新状态
    this.setState({ fileList });
  }

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/manage/img/upload"  //上传图片的url
          name="image"  //图片文件对应的参数名
          listType="picture-card"  //显示风格
          fileList={fileList}  //已上传的所有图片文件信息对象的数组
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width:100,height:100 }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}