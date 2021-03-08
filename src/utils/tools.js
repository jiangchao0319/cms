// 数据转tree
export function listToTree(srcData, selfField, parentField, topFlag) {
  var tree = new Array();
  if (srcData) {
    var dict = new Array();
    // add  roodnode
    var n = srcData.length;
    for (var i = 0; i < n; i++) {
      var item = srcData[i];
      dict[item[selfField]] = item;
      if (item[parentField] == topFlag || item[parentField] == "") {
        tree[tree.length] = (item); // 添加根节点
      }
    }
    // 由下至上，构造树
    for (var j = 0; j < n; j++) {
      var child = srcData[j];
      if (child[parentField] == topFlag || child[parentField] == "") {
        continue;
      }
      var parent = dict[child[parentField]];
      if (parent) {
        //child.parent = parent;
        if (!parent.children) {
          parent.children = new Array();
        }
        (parent.children)[parent.children.length] = (child);
      }
    }
    return tree;
  }
}
