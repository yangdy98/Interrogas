USE [Interrogas]
GO
/****** Object:  StoredProcedure [dbo].[Candidates_Update]    Script Date: 5/1/2022 8:19:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Dongyoung Yang
-- Create date: 3/24/2022
-- Description: Update Procedure
-- Code Reviewer:

-- MODIFIED BY: Dongyoung Yang
-- MODIFIED DATE: 3/24/2022
-- Code Reviewer:
-- Note:
-- =============================================


ALTER Proc [dbo].[Candidates_Update]
	@givenName nvarchar(100),
	@surnames nvarchar(100),
	@genderType nvarchar(100),
	@age int,
	@avatarUrl varchar(255),
	@party nvarchar(100),
	@electionType nvarchar(100), 
	@status nvarchar(30), 
	@isElected bit,
	@Id int

As
/*

-----Test Code ------

	Declare @Id int = 15 
	Declare 	
			@givenName nvarchar(100) = 'Harrison',
			@surnames nvarchar(100)= 'Ford',
			@genderType nvarchar(100) = 'Male',
			@age int =50,
			@avatarUrl varchar(255) ='https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425__340.png',
			@party nvarchar(100) = 'Green Ecological Party',
			@electionType nvarchar(100) = 'President', 
			@status nvarchar(30) = 'Flagged', 
			@isElected bit = 0

	Execute dbo.Candidates_Update
			@givenName,
			@surnames,
			@genderType,
			@age,
			@avatarUrl,
			@party,
			@electionType, 
			@status, 
			@isElected,
			@Id
	Select * from dbo.Candidates

*/

Begin
	Declare @dateMod datetime2 = getutcdate()
	Declare @genderTypeId int, @partyId int,@statusId int,@electionId int
	Set @genderTypeId= (Select g.Id from dbo.GenderTypes as g where g.Name = @genderType)
	Set @partyId= (Select p.Id from dbo.Parties as p where p.Name = @party)
	Set @statusId= (Select s.Id from dbo.StatusType as s where s.Name = @status)
	Set @electionId= (Select e.Id from dbo.ElectionTypes as e where e.Name = @electionType)

UPDATE [dbo].[Candidates]
   SET [GivenName] = @givenName
      ,[Surnames] = @surnames
      ,[GenderTypeId] = @genderTypeId
      ,[Age] = @age
      ,[AvatarUrl] = @avatarUrl
      ,[PartyId] = @partyId
      ,[ElectionId] = @electionId
      ,[StatusId] = @statusId
      ,[IsElected] = @isElected
      ,[DateModified] = @dateMod
 WHERE Id = @Id

 END

