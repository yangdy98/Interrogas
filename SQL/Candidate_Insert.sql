USE [Interrogas]
GO
/****** Object:  StoredProcedure [dbo].[Candidates_Insert]    Script Date: 5/1/2022 8:18:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Dongyoung Yang
-- Create date: 3/24/2022
-- Description: Insert Procedure
-- Code Reviewer: David Wiltrout

-- MODIFIED BY: Dongyoung Yang
-- MODIFIED DATE: 3/24/2022
-- Code Reviewer:
-- Note:
-- =============================================

ALTER Proc [dbo].[Candidates_Insert]
	@givenName nvarchar(100),
	@surnames nvarchar(100),
	@genderTypeId int,
	@age int,
	@avatarUrl varchar(255),
	@partyId int,
	@electionId int, 
	@statusId int, 
	@isElected bit,
	@Id int OUTPUT

As
/*

-----Test Code ------

	Declare @Id int = 0
	Declare 	
			@givenName nvarchar(100) = 'Harrison',
			@surnames nvarchar(100)= 'Ford',
			@genderTypeId int = '1',
			@age int =50,
			@avatarUrl varchar(255) ='google.com',
			@partyId int = 1,
			@electionId int = 1, 
			@statusId int = 1, 
			@isElected bit = 1

	Execute dbo.Candidates_Insert
			@givenName,
			@surnames,
			@genderTypeId,
			@age,
			@avatarUrl,
			@partyId,
			@electionId, 
			@statusId, 
			@isElected,
			@Id
	Select * from dbo.Candidates

*/

Begin

	INSERT INTO [dbo].[Candidates]
			   ([GivenName]
			   ,[Surnames]
			   ,[GenderTypeId]
			   ,[Age]
			   ,[AvatarUrl]
			   ,[PartyId]
			   ,[ElectionId]
			   ,[StatusId]
			   ,[IsElected])


	VALUES 
				(@givenName
				,@surnames
				,@genderTypeId
				,@age
				,@avatarUrl
				,@partyId
				,@electionId
				,@statusId
				,@isElected)
				
				SET @Id = SCOPE_IDENTITY()
END

