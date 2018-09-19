status 15.09.2018.

Beta token contarct is ready "BetatokenERC223_v3" 
- erc223
-tranfer working
-minting working

BetaWallet is on the development: "Beta_Wallet_for_HoneyGramm"

	planed functionality:
		- would be created to the user and would be a uniqe wallet, 
		  owner of the wallet is the user TODO: factory-contarct
		- user can host Beta Token in this wallet OK
		- user can see the token balance of wallet OK
		- user can withdraw Beta tokens from the wallet to own ethereum account TODO: write the withdraw function
		- wallet can host also ether and the user can withdraw it from the wallet OK
		- user can see the ether balance of the wallet OK
		- not neccessary to hold ether in this wallet -it is only an emergency function
		- user can initiate a token transfer to the other user OK , TODO: at the moment only admin can sing instead of the target user, C
		  and if the target user accept it the transaction would be done TODO: add the option
		  or if they have any problem the Admin can sign instead of the target user or OK
		  can delete the transaction OK
		- user also can delete the tx. OK
		- user can initiate different type of token-transfer
			. just send token to the other user and waiting the acceptation
			  ( in case the tx wait 2 signatures ,
			 one from the sender user and otherone form the target user OR admin)   OK TODO: target user can sign
			. TOKEN STAKING :send the token to the other user with conditions OK TODO: target user can sign
			  ( in case the tx wait 3 signatires,
			 one from the sender, otherone from the target AND admin)
			. DATE STAKING : tx with 2 steps  MISSING 
			  (1 step: the user2 accept the invitation -> 
			   2.step user initiate a tx with condition and waiting the signatures
			   one from the user and otherone from target user OR admin if they have a problem)

		- the user must have a private account from what he/she will sign the transactions and this privat account must have some ether!
		  This privat account would be exist or the server will generate when the user registrating. Pls note the users : the server-generated accont not safety!

			 


			 
		
 