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
    To run ecobin locally with its full functionality (barcode scanner included) you will need a few things.
    
    1. A folder on your computer with the cloned repository (create and go to a folder with any name of your choosing and run
    "git clone https://github.com/astvilia/11249group7.git".
    
    2. The Expo Go app downloaded onto your mobile device.

    3. The IP Address of the computer you are running the node on. Follow this guide if you are not already aware of how to do this: https://www.avast.com/c-how-to-find-ip-address. Once you have your IP address you will need to edit one of the files in 11249group7/ecobin/apollo.js. On line 9 there is a declaration for a URI: "const URI = 'http://0.0.0.0:4000'". Replace "0.0.0.0" with the IP address of your machine. For example, if your IP address is "1.2.3.4" line 9 should be "const URI: 'http://1.2.3.4:4000'".

    4. You are now ready to run EcoBin. While in the 11249group7 directory, change your directory to API "cd API". In the command line input "npm start". You should get a message back along the lines of "Server ready at http://localhost:4000/". If the number is not 4000, you will need to go back to step 3 and swap the 4000 in the URI with whatever number it says. For example, if it says "Server ready at http://localhost:123/" and your IP address is "1.2.3.4", line 9 should be "const URI = 'http://1.2.3.4:123'".

    5. Now that the backend server is running you will need to start the front end. Navigate back to the 11249group7 directory "cd .." and change your directory to ecobin "cd ecobin." In the command line input "npm start". You should be taken to a website for Expo Developer Tools. Once everything is loaded there should be a QR code in the bottom left. Scan it with your mobile device and click the link. EcoBin will now be built and will start running on your mobile device!