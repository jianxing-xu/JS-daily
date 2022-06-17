## CORS 解决跨域问题

CORS在浏览器端不用手动处理，关键处理是在服务器端。

>**CORS 分为 `simple request`(简单请求) 和 `not-so-simple request`(非简单请求)**

### 简单请求

同时满足两个条件
  1. Request Method: `GET`、`POST`、`HEAD`
  2. 信息头不超过一下几个字段
    - Accept
    - Accept-Language
    - Content-Language
    - Last-Event-ID
    - Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain

  服务器通过 `Access-Control-Allow-Origin: *` 控制可跨域访问的来源 `*` 表示允许任何网站.但是设置了 `*` 就不允许使用cookie

  服务器通过 `Access-Control-Allow-Credentials: true` 表示服务器同意接受 `cookie`

  客户端设置 表示允许发送 `cookie`
  ```js
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  ```

### 非简单请求

  除简单请求外则是非简单请求

  非简单请求在正式发送请求之前会先发送 **预检请求(OPTIONS)** HTTP查询请求，来检查是否符合请求条件 

  #### OPTIONS 预检请求的响应头

  - `Access-Control-Allow-Origin: *`
  - `Access-Control-Allow-Methods: PUT,GET,POST`
  - `Access-Control-Max-Age: 1728000` 预检请求的有效期，在有效期内不会重复发送预检请求



### `<img corsOrigin="anonymous" />`

`corsOrigin` 表示图片资源通过CORS跨域访问，此时如果服务端配置 `Access-Control-Allow-Origin` 为可用状态的话会导致图片跨域访问失败。

>可添加时间戳加载图片让图片不走缓存
