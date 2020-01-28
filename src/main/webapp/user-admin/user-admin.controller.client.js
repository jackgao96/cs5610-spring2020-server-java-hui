(function() {
	let index = -1
	let users = [ ]
	let $userList = $("#userList")
	let $createUserBtn = $("#createUser")
	let $updateUserBtn = $("#updateUser")
	
	let $usernameFld = $("#usernameFld")
	let $passwordFld = $("#passwordFld")
	let $firstName = $("#firstNameFld")
	let $lastName = $("#lastNameFld")
	let $role = $("#roleFld")
	
	let userService = new AdminUserServiceClient()
	
	
	const renderUsers = () =>{
		
		$userList.empty()
		for(let u in users){
			const user = users[u];
			let $tr = $(`<tr><td>${user.username}</td>
			<td>${user.password}</td>
			<td>${user.firstname}</td>
			<td>${user.lastname}</td>
			<td>${user.role}</td>
			</tr>`)
			let $deleteBtn = $(`
					<span class="float-right">
					<button type="button" id="deleteUser"><i id="wbdv-remove" class="fa-2x fa fa-times wbdv-remove"></i></button>
					</span>`)
			let $editBtn = $(`
					<span class="float-right">
					<button type="button" id="editUser"><i id="wbdv-edit" class="fa-2x fa fa-pencil wbdv-edit"></i></button>
					</span>`)
			$deleteBtn.click(() => {
				deleteUser(u)
			})
			$editBtn.click(() => {
				//alert("edit")
				selectUser(u)
			})
			$tr.append($deleteBtn)
			$tr.append($editBtn)
			$userList.append($tr);
		}
	}
	const findAllUsers = () => {
		userService.findAllUsers()
			.then(remoteUsers => {
				users = remoteUsers
				renderUsers()
			})
	}
	
	const deleteUser = position => {
		let user = users[position]
		//let user = users[index]
		let _id = user._id
		
		userService.deleteUser(_id)
			.then(response => {
				users.splice(position, 1)
				renderUsers()
				//findAllUsers()
			})
	}
	
	let currentUser = -1;
	const findUserById = _id => {
		
		userService.findUserById(_id)
			.then(user => {
				$usernameFld.val(`${user.username}`)
				$passwordFld.val(`${user.password}`)
				$firstName.val(`${user.firstname}`)
				$lastName.val(`${user.lastname}`)
				$role.val(`${user.role}`)
			})
	}
	const selectUser = index => {
		const user = users[index];
		//const user = selectUser(index)
		const _id = user._id
		currentUser = index
		findUserById(_id)
		
	}
	
	const renderUser = () => {
		const newUser = {
			username: $usernameFld.val(),
			password: $passwordFld.val(),
			firstname: $firstName.val(),
			lastname: $lastName.val(),
			role: $role.val()
		}
		return newUser
	}
	const createUser = () => {
		//console.log("111")
		
		//$usernameFld.val("")
		
		userService.createUser(renderUser()).then(
			brandNewUser => {
				users.push(brandNewUser)
				renderUsers()
			}
			
			)
		$usernameFld.val("")
		$passwordFld.val("")
		$firstName.val("")
		$lastName.val("")
	
	}
	
	const updateUser = () => {
		let user = users[currentUser]
		
		
		user.username = $usernameFld.val(),
		user.password = $passwordFld.val(),
		user.firstname = $firstName.val(),
		user.lastname = $lastName.val(),
		user.role = $role.val()
		
		
		
		userService.updateUser(user._id, user)
			.then(brandNewUser => {
				renderUsers()
			})
		$usernameFld.val("")
		$passwordFld.val("")
		$firstName.val("")
		$lastName.val("")
		
	}
	
	function main() {
		$createUserBtn.click(createUser)
		$updateUserBtn.click(updateUser)
		// userService.findAllUsers()
		// 	.then(remoteUsers => {
		// 		users = remoteUsers
		// 		renderUsers()
		// 	})
		findAllUsers()
	}
	$(main)
})()

