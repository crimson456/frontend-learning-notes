function resolvePath(relative, base, append) {
  // 绝对路径直接返回
  const firstChar = relative.charAt(0);
  if (firstChar === "/") {
    return relative;
  }
  // 相对路径以?或#开头表示为query参数或hash值，直接拼接
  if (firstChar === "?" || firstChar === "#") {
    return base + relative;
  }

  const stack = base.split("/");

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  // 去掉一个/，并且以/分割相对路径
  const segments = relative.replace(/^\//, "").split("/");
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    if (segment === "..") {
      stack.pop();
    } else if (segment !== ".") {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== "") {
    stack.unshift("");
  }

  return stack.join("/");
}

let a = resolvePath("./d/e/f", "/a/b/c", true);
console.log("/a/b/c".split('/'));
