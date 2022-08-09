<template>
  <div class="timeclue-box">
    <el-timeline>
      <el-timeline-item timestamp="2018/4/12" placement="top" type="info">
        <el-card>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/12 20:46</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/3" placement="top" type="success">
        <el-card>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/3 20:46</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item
        timestamp="2018/4/2"
        placement="top"
        type="success"
        color="blue"
      >
        <el-card>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/2 20:46</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<style lang="less" scoped>
.timeclue-box {
  height: 100%;
  padding: 2vw;
  border-radius: 5px;
  background-color: rgba(250, 250, 250, 0.8);
  box-sizing: border-box;
}
</style>
