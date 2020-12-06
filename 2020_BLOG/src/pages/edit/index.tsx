import React, { useState, useEffect } from 'react'
import { Editor, IAllProps } from '@tinymce/tinymce-react'
import { Button, message, Spin } from 'antd'
import './edit.less'
import { connect } from 'react-redux'
import { getIp } from '../../api/locationServer'
import { createArticleAction } from '../../actions/article'

// 获取用户ip地址
var useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches

const Edit = (props: any) => {
  const [editVal, setEditVal] = useState('')
  const [isRandomLocal, setRandomLocal] = useState(false)
  const [isEditorInit, setEditInitStatus] = useState(false)
  useEffect(() => {
    console.log('change!', props)
  }, [editVal, isEditorInit])
  useEffect(() => {
    if (!props.isLogin) {
      props.history.push('/user')
      message.destroy()
      message.info('请先登陆')
    }
  })
  let editInit: IAllProps = {
    init: {
      init_instance_callback: () => setEditInitStatus(true),
      min_height: 500,
      max_height: 500,
      resize: false,
      statusbar: false,
      skin: useDarkMode ? 'oxide-dark' : 'borderless',
      // content_css: useDarkMode ? 'oxide-dark' : 'small',
      // skin: 'borderless',
      icons: 'small',
      // content_css: 'fabric',
      fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt 48pt 72pt',
      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:24px}',
      language: 'zh_CN',
      language_load: true,
      plugins:
        'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
      toolbar:
        'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
    },
  }
  let createArticleBtn = async () => {
    let location
    if (isRandomLocal)
      location = {
        lat: (Math.random() > 0.5 ? -1 : 1) * Math.random() * 10 * 18,
        lng: (Math.random() > 0.5 ? -1 : 1) * Math.random() * 10 * 9,
      }
    else {
      let localRes: any = await getIp()
      location = localRes.result.location
    }
    let createArticleRes = await props.createArticleAction({
      articleContent: editVal,
      user: props.userInfo.account,
      local: location,
    })
    console.log('createArticleRes', createArticleRes)
  }
  let changeEditVal = (editor: any, content?: string | any) => {
    setEditVal(editor.getContent())
    console.log(editVal)
  }
  return (
    <>
      <h2 className="globe_title">Edit</h2>
      <Spin tip="编辑器初始化中..." spinning={!isEditorInit}>
        <Editor {...editInit} apiKey="v949ii64ypfjkc240zjddg8ylrw0yzg6a5xurbpft9pdarcy" id="editor" onBlur={(content, editor) => changeEditVal(editor)} />
      </Spin>
      <div className="sub_btn">
        <Button
          onClick={() => {
            setRandomLocal(!isRandomLocal)
          }}
        >
          经纬度：{isRandomLocal ? '随机地址' : '当前位置'}
        </Button>
        <Button onClick={createArticleBtn}>提交</Button>
      </div>
    </>
  )
}
const mapState = (state: any) => ({
  userInfo: state.user.userInfo,
  isLogin: state.user.isLogin,
})
const mapDispatchToProps = {
  createArticleAction,
}
export default connect(mapState, mapDispatchToProps)(Edit)
