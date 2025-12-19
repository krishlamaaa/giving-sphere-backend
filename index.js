local AssetManager = {}

local HttpService = game:GetService("HttpService")

local function getUserCreatedTShirts(username, SignPrices)
	local tshirts = {}
	local data = HttpService:JSONDecode(HttpService:GetAsync("https://catalog.roproxy.com/v1/search/items/details?Category=3&CreatorName=" .. username)).data
	if data then
		pcall(function()
			table.sort(data,
				function(a,b)
					return a.price < b.price
				end
			)
		end)
		for _, item in pairs(data) do
			local e,s = pcall(function()
				table.insert(tshirts, item.id)
				local newBtn = script.Template:Clone()
				local price = item.price
				newBtn.PurchaseButton.Text = price.."\u{E002}"
				newBtn.Icon.Image = "rbxthumb://type=Asset&id="..item.id.."&w=150&h=150" 
				newBtn.LayoutOrder = price
				newBtn.Name = price
				newBtn.ImportantValues.AssetName.Value = item.name
				newBtn.ImportantValues.AssetId.Value = item.id
				newBtn.ImportantValues.AssetType.Value = "Clothing"
				newBtn.Parent = SignPrices

			end)
		end
	end
	return tshirts
end

local function getUserCreatedGamepasses(userId, boothUI)

	local gamepasses = {}
	local GetGamesUrl1 = "https://games.RoProxy.com/v2/users/"
	local GetGamesUrl2 = "/games?accessFilter=Public&sortOrder=Asc&limit=10"
	local getGamesUrl = GetGamesUrl1..userId..GetGamesUrl2

	local success,result = pcall(function()
		return HttpService:GetAsync(getGamesUrl)
	end)

	if success then
		pcall(function()
			result = HttpService:JSONDecode(result)
			for _, GameInfo in pairs(result["data"]) do
				local gameId = GameInfo.id
				local url = "https://games.RoProxy.com/v1/games/%s/game-passes?limit=100&sortOrder=Asc"
				url = url:format(gameId)

				local success2,result2 = pcall(function()
					return HttpService:GetAsync(url)
				end)

				if success2 then
					result2 = HttpService:JSONDecode(result2)
					for _, GamepassDetail in pairs(result2["data"]) do
						local gamepassId = GamepassDetail.id
						table.insert(gamepasses,gamepassId)
						local e,s = pcall(function()
							local newBtn = script.Template:Clone()
							local price = GamepassDetail.price
							newBtn.Name = price
							newBtn.PurchaseButton.Text = price.."\u{E002}"
							newBtn.Icon.Image = "rbxthumb://type=GamePass&id="..GamepassDetail.id.."&w=150&h=150" 
							newBtn.LayoutOrder = price
							newBtn.ImportantValues.AssetId.Value = GamepassDetail.id
							newBtn.ImportantValues.AssetName.Value = GamepassDetail.displayName
							newBtn.ImportantValues.AssetType.Value = "Gamepass"
							newBtn.Parent = boothUI
						end)
					end
				end
			end
		end)
	end
	return gamepasses
end

function AssetManager:GetAssets(Player, BoothUI)
	if Player.UserId <= 0 then
		getUserCreatedGamepasses(3806689056, BoothUI)
	end
	getUserCreatedTShirts(Player.Name, BoothUI)
	getUserCreatedGamepasses(Player.UserId, BoothUI)
end

function AssetManager:GetAssetsGift(PlayerName, PlayerUserId, BoothUI)
	getUserCreatedTShirts(PlayerName, BoothUI)
	getUserCreatedGamepasses(PlayerUserId, BoothUI)
end
return AssetManager
