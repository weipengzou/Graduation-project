import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { List, Button, BackTop } from 'antd'
import { getArticleListAction } from '../../actions/article'
import { Editor, IAllProps } from '@tinymce/tinymce-react'
import './article.less'
import 'echarts-gl'
import ReactEcharts, { ReactEchartsPropsTypes } from 'echarts-for-react'
let editInit: IAllProps = {
  init: {
    body_class: '.test_editor',
    inline: true,
    menubar: false,
    toolbar: false,
    plugins: ['link', 'lists', 'powerpaste', 'autolink', 'tinymcespellchecker'],
  },
}
const Article = (props: any) => {
  const [isEcharts, setIsEcharts] = useState(true)
  const reactEchartRef = useRef<any>(null)
  // const ecOption:<ReactEchartsPropsTypes> = {
  var ecOption: any = {
    backgroundColor: '#000',
    title: {
      show: true,
      text: '全球博客链指向地址',
    },
    series: [
      {
        // 线图
        name: 'lines3D',
        type: 'lines3D',
        coordinateSystem: 'globe',
        effect: {
          show: true,
          period: 2,
          trailWidth: 1,
          trailLength: 0.5,
          trailOpacity: 1,
          trailColor: '#0087f4',
        },
        blendMode: 'lighter',
        lineStyle: {
          width: 10,
          color: '#0087f4',
          opacity: 0,
        },
        data: [],
        silent: false,
      },
    ],
    globe: {
      globeOuterRadius: 150,
      baseTexture: '/images/world.topo.bathy.200401.jpg',
      heightTexture: '/images/bathymetry_bw_composite_4k.jpg',
      displacementScale: 0.2,
      shading: 'realistic',
      environment: '/images/starfield.jpg',
      // 部分手机性能较差加载不了，关闭灯光和质量
      // postEffect: {
      //   enable: true,
      // },
      // bloom: {
      //   enable: true,
      // },
      viewControl: {
        autoRotate: true,
        distance: 200,
        minDistance: 10,
        targetCoord: [116.46, 39.92],
      },
      // light: {
      //   main: {
      //     intensity: 2,
      //     shadow: true,
      //   },
      //   ambientCubemap: {
      //     texture: '/images/pisa.hdr',
      //     exposure: 2,
      //     diffuseIntensity: 2,
      //     specularIntensity: 2,
      //   },
      // },
    },
  }
  useEffect(() => {
    // 初始化
    props.getArticleListAction()
  }, [])
  useEffect(() => {
    if (reactEchartRef.current?.props.option.series[0].data) {
      console.log('二次渲染')
      let echartData: any = []
      let tempArr: any = []
      // 目标结构[[[],[],[]],[]]，三层数组嵌套
      // 获取文章经纬度渲染echart
      props.articleList.map((itm: any, idx: number) => {
        if (itm.local === undefined) return
        else if (idx === 0) tempArr.push(Object.values(itm.local))
        else if (tempArr.length < 2) {
          tempArr.push(Object.values(itm.local))
          echartData.push(tempArr)
        } else if (tempArr.length === 2) {
          tempArr = []
          tempArr.push(Object.values(itm.local))
        }
      })
      console.log('echartData', echartData)
      console.log(reactEchartRef.current)
      // 差异渲染
      reactEchartRef.current.props.option.series[0].data = [...echartData]
      reactEchartRef.current.getEchartsInstance().setOption(reactEchartRef.current.props.option)
    }
  }, [ecOption])
  // 切换文章视图
  let changeArticleType = () => setIsEcharts(!isEcharts)
  return (
    <>
      <h2 className="globe_title">Article</h2>
      <div className="switch_btn">
        <Button onClick={changeArticleType}>切换</Button>
      </div>
      {isEcharts ? (
        <ul className="articleList">
          <List
            dataSource={props.articleList}
            itemLayout="horizontal"
            size="large"
            loadMore={<Button>loading more</Button>}
            loading={props.isLoading}
            renderItem={(item: any) => (
              <>
                <List.Item
                  extra={
                    <div className="editor">
                      <Editor initialValue={item.data} disabled={true} {...editInit} />
                    </div>
                  }
                >
                  <List.Item.Meta
                    title={<div>{item.hash}</div>}
                    description={
                      <div>
                        <div>创建时间：{item.createTime}</div>
                        <div>前块hash：{item.previousHash}</div>
                      </div>
                    }
                  />
                </List.Item>
              </>
            )}
          />
          <BackTop />
        </ul>
      ) : (
        <ReactEcharts className="echarts_map" theme="dark" ref={reactEchartRef} option={ecOption} notMerge={true} showLoading={props.articleList.length < 1 ? true : false} />
      )}
    </>
  )
}
const mapState = (state: any) => ({
  articleList: state.article.articleList,
  isLoading: state.article.isLoading,
})
const mapDispatchToProps = {
  getArticleListAction,
}
export default connect(mapState, mapDispatchToProps)(Article)
