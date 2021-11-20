# 11249group7

CEN3031 Group Project Fall 2021

Member 1: Anna Stvilia <br></br>
Member 2: Joshua Wonesh <br></br>
Member 3: Ali Abusulb <br></br>
Member 4: Kyle Blackmon 

EcoBin WasteManagement Mobile App

Summary:
    EcoBin is a mobile app supported on both IOS and Android that was developed utilizing the MERN stack. Users can create an account where they will gain access to a virtual fridge where they can add and remove items in their fridge and pantry at home either manually or utilizing a barcode scanner. The virtual fridge will dispaly the name, expiration date, and image of the items. Data is persistent, so you can sign out and log in without worrying about having to add all of the items back into your virtual fridge.

How to Run EcoBin locally:
    To run ecobin locally with its full functionality (barcode scanner included) you will need a few things:
    
    1. Node.js installed on your computer. Link for the download if you do not have it (https://nodejs.org/en/download/
    
    2. Expo-CLI installed on your computer. Run this command into the command line if you do not have it "npm install --global" expo-cli)

    3. A folder on your computer with the cloned repository (create and go to a folder with any name of your choosing and run
    "git clone https://github.com/astvilia/11249group7.git".
    
    4. The Expo Go app downloaded on your mobile device.

    5. The IP Address of the computer you are running the node on. Follow this guide if you do not know the IP address of your computer: https://www.avast.com/c-how-to-find-ip-address. Once you have your IP address you will need to edit one of the files in 11249group7/ecobin/apollo.js. On line 9 there is a declaration for a URI: "const URI = 'http://0.0.0.0:4000'". Replace "0.0.0.0" with the IP address of your machine. For example, if your IP address is "1.2.3.4" line 9 should be "const URI: 'http://1.2.3.4:4000'".

    6. You are now ready to run EcoBin. While in the 11249group7 directory, run the command "npm start" into the command line. You should get a message back along the lines of "Server ready at http://localhost:4000/". If the number is not 4000, you will need to go back to step 3 and swap the 4000 in the URI with whatever number it says. For example, if it says "Server ready at http://localhost:123/" and your IP address is "1.2.3.4", line 9 should be "const URI = 'http://1.2.3.4:123'".

    7. If everything started without issue there should be a QR code in the command line output. Scan it with your mobile device and click the link. EcoBin will now be built and will start running on your mobile device!