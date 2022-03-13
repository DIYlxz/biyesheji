import Mock from 'mockjs'

const videoObj = [{
    name: "001",
    id: "1d",
    video: "../../assets/video/test/000001.mp4",
}, {
    name: "001",
    id: "2d",
    video: "../../assets/video/test/000002.mp4",
},{
    name: "001",
    id: "3d",
    video: "../../assets/video/test/000003.mp4",
},];

Mock.mock("/api/video", "get", () => {
    return {
        state: 200,
        msg: "视频获取成功",
        videoArr: videoObj,
    }
});