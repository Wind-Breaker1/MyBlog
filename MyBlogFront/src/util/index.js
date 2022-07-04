import Fingerprint2 from 'fingerprintjs2'
// export const createFingerprint = () => {
//   // 选择哪些信息做为浏览器指纹生成的依据
//   const options = {
//     fonts: {
//       extendedJsFonts: true,
//     },
//     excludes: {
//       audio: true,
//       userAgent: true,
//       enumerateDevices: true,
//       touchSupport: true,
//     },
//   };
//   // 浏览器指纹
//   const fingerprint = Fingerprint2.get(options, (components) => { // 参数只有回调函数或者options为{}时，默认浏览器指纹依据全部配置信息进行生成
//     const values = components.map(component => component.value); // 配置的值的数组
//     const murmur = Fingerprint2.x64hash128(values.join(''), 31); // 生成浏览器指纹
//     // console.log(components);
//     // console.log(values);
//     console.log(murmur);
//     localStorage.setItem('browserId', murmur); // 存储浏览器指纹，在项目中用于校验用户身份和埋点
//   });
// }
// 获取浏览器指纹
export const createFingerprint = () => {
  Fingerprint2.get((components) => {
    const values = components.map((component, index) => {
      if (index === 0) { //把微信浏览器里UA的wifi或4G等网络替换成空,不然切换网络会ID不一样
        return component.value.replace(/\bNetType\/\w+\b/, '')
      }
      return component.value
    })
    // 生成最终id murmur   
    let murmur = Fingerprint2.x64hash128(values.join(''), 31);
    localStorage.setItem('browserId', murmur); // 存储浏览器指纹，在项目中用于校验用户身份和埋点
    console.log('浏览器指纹码：' + murmur)
  })
}
