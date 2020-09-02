
layui.extend({
	admin: '{/}../../static/js/admin'
});
layui.use(['laydate', 'jquery', 'admin','table'], function() {
	var laydate = layui.laydate,
    $ = layui.jquery,
    table = layui.table,
		admin = layui.admin;
	//执行一个laydate实例
	laydate.render({
		elem: '#start' //指定元素
	});
	//执行一个laydate实例
	laydate.render({
		elem: '#end' //指定元素
	});
	/*用户-停用*/
	window.member_stop = function (obj, id) {
		layer.confirm('确认要停用吗？', function(index) {
			if($(obj).attr('title') == '启用') {

				//发异步把用户状态进行更改
				$(obj).attr('title', '停用')
				$(obj).find('i').html('&#xe62f;');

				$(obj).parents("tr").find(".td-status").find('span').addClass('layui-btn-disabled').html('已停用');
				layer.msg('已停用!', {
					icon: 5,
					time: 1000
				});

			} else {
				$(obj).attr('title', '启用')
				$(obj).find('i').html('&#xe601;');

				$(obj).parents("tr").find(".td-status").find('span').removeClass('layui-btn-disabled').html('已启用');
				layer.msg('已启用!', {
					icon: 5,
					time: 1000
				});
			}
		});
	}

	/*用户-删除*/
	window.member_del = function (obj, id) {
		layer.confirm(`确认要删除用户 ${id} 吗？`, function(index) {
			//发异步删除数据
      $.ajax({
        url: '/admin/user/delete',
        method:'post',
        data: {name:id},
      }).then(function(res){
        if(res.state == 'ok'){
          layer.msg(`${res.content}`,{
            icon: 1,
            time: 1000,
            end: function(){
              $(obj).parents("tr").remove();
            }
          })
        }
      })
		});
	}

	window.delAll = function (argument) {
    let data = table.checkStatus('userList').data
    let arr = []
    data.forEach(element => {
      let name = element.name
      arr.push(name)
      return arr
    });
		layer.confirm(`确认要删除用户 ${arr} 吗？`, function(index) {
      //捉到所有被选中的，发异步进行删除
      let data = {...arr}
      $.ajax({
        url: '/admin/user/delete/all',
        method:'post',
        data: data,
      }).then(function(res){
        if(res.state == 'ok') {
          layer.msg(`${res.content}`, {
            icon: 1,
            time: 1000,
            end: function(){
              $(".layui-form-checked").not('.header').parents('tr').remove();
            }
          });
        }else{
          layer.msg(`${res.content}`, {
            icon: 2
          });
        }
      })
		});
  }
  
  	/*用户-激活*/
	window.reuse = function (obj, id) {
		layer.confirm(`确认要重新激活用户 ${id} 吗？`, function(index) {
			//发异步删除数据
      $.ajax({
        url: '/admin/user/reuse',
        method:'post',
        data: {name:id},
      }).then(function(res){
        if(res.state == 'ok'){
          layer.msg(`${res.content}`,{
            icon: 1,
            time: 1000,
            end: function(){
              $(obj).parents("tr").remove();
            }
          })
        }
      })
		});
  }
  
  window.reAll = function (argument) {
    let data = table.checkStatus('userList').data
    let arr = []
    data.forEach(element => {
      let name = element.name
      arr.push(name)
      return arr
    });
		layer.confirm(`确认要激活用户 ${arr} 吗？`, function(index) {
      //捉到所有被选中的，发异步进行删除
      let data = {...arr}
      $.ajax({
        url: '/admin/user/reuse/all',
        method:'post',
        data: data,
      }).then(function(res){
        if(res.state == 'ok') {
          layer.msg(`${res.content}`, {
            icon: 1,
            time: 1000,
            end: function(){
              $(".layui-form-checked").not('.header').parents('tr').remove();
            }
          });
        }else{
          layer.msg(`${res.content}`, {
            icon: 2
          });
        }
      })
		});
  }



});
