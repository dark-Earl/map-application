<template>
  <div class="side">
    <ul>
      <li>
        <a :href="'/zhzx.html#/zhxx'">
          <div class="sidebox"><i class="side-icon-wkt"></i><p>微课堂</p></div>
        </a>
      </li>
      <li>
        <a>
          <div class="sidebox"><i class="side-icon-xqsq"></i><p>需求申请</p></div>
        </a>
      </li>
      <li>
        <a>
          <div class="sidebox"><i class="side-icon-dcwj"></i><p>调查问卷</p></div>
        </a>
      </li>
      <li>
        <a>
          <div class="sidebox"><i class="side-icon-hdbm"></i><p>活动报名</p></div>
        </a>
      </li>
      <li class="top">
        <a-back-top>
          <div class="ant-back-top-inner">
            <a-icon type="vertical-align-top" />
          </div>
        </a-back-top>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "fixedSide", //侧边菜单
};
</script>
