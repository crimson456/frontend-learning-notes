# Jsonwebtoken Learning


## JWT数据结构
1. token整体结构：
   ```
   Header(头部).Payload(负载).Signature(签名)
   ```
   Header(头部)和Payload(负载)都是将对象通过Base64URL算法编码成的字符串
   Signature(签名)是根据Header(头部)和Payload(负载)和一个密钥通过签名算法生成的字符串

   >密钥可以通过UUID生成

2. Header(头部)
   ```json
   {
     "alg": "HS256",
     "typ": "JWT"
   }
   ```

3. Payload(负载)
   标准字段：
   - iss (issuer)：签发人
   - exp (expiration time)：过期时间
   - sub (subject)：主题
   - aud (audience)：受众
   - nbf (Not Before)：生效时间
   - iat (Issued At)：签发时间
   - jti (JWT ID)：编号

4. Signature(签名)
   ```js
   HMACSHA256(
     base64UrlEncode(header) + "." +
     base64UrlEncode(payload),
     secret)
   ```
   通过对应的签名算法产生，防止数据篡改

## jsonwebtoken 库


1. jsonwebtoken模块下的方法

   - `jwt.sign(payload, secretOrPrivateKey, [options, callback]` 
      将payload包装成一个token字符串，在返回值(同步)或回调(异步)中获得结果
      options：
        - algorithm 算法
        - expiresIn(exp) 过期时间
        - notBefore(nbf) 生效时间
        - audience(aud) 受众
        - issuer(iss) 签发人
        - jwtid(jti) 编号
        - subject(sub) 主题
        - noTimestamp 不加入时间戳(不加入iat成员)
        - header ？
        - keyid ？
        - mutatePayload 布尔值，如果为真，则会直接将payload对象该变为包装后的payload对象(加上上述选项中的字段)
        >有括号的选项会为payload添加成员，成员名为括号内的字符，且默认会为payload添加名为iat的成员

   - `jwt.verify(token, secretOrPublicKey, [options, callback])`
      验证一个token的合法性，合法则返回token对应的payload,不合法则抛出错误，在返回值(同步)或回调(异步)中获得结果
      options：
        - algorithms 检测的算法数组
        - complete 布尔值，控制返回值为完整解析的token对象还是payload
        - ignoreExpiration 忽略过期时间
        - ignoreNotBefore 忽略生效时间
        - audience 验证aud字段
        - issuer 验证iss字段
        - jwtid 验证jti字段
        - subject 验证sub字段
        - clockTolerance 可容忍时长，用于检测exp、nbf
        - maxAge 允许token有效的最大时长 ？
        - clockTimestamp 设置用于比对的时间戳
        - nonce ？


   - `jwt.decode(token [, options])` 
      转化token
      options:
         - json 布尔值，是否对返回的payload强制使用JSON.parse方法
         - complete 布尔值，控制返回值为完整解析的token对象还是payload


## 使用和特点

1. 使用流程:
   - 客户端发送登录信息
   - 服务端生成根据登录信息生成token发回客户端
   - 客户端保存token(可以存在cookie、localStorage中)
   - 客户端访问服务端时
      1. 放在cookie中自动发送(不能跨域)
      2. 放在请求头的Authorization字段中
      3. 放在POST请求数据体里或者url参数中

2. 特点
   - 服务器不保存session状态，无法中途更改token权限
   - token包含认证信息，可被盗用
   - 默认不加密，不要将密码放入JWT
   - 为了减少盗用，JWT 不应该使用 HTTP 协议明码传输，要使用 HTTPS 协议传输