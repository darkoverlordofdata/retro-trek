00005 RANDOMIZE
00010  DIM S(8,8),R(6),D(8,8)
00015  DIM J(10)
00020  DEF  FNA(X)= INT(RND(0)*X)+1
00030  REM      INITIALIZE EVERYTHING
00040  LET K1= FNA(20)+10
00041  LET K1= INT (K1*1.2)
00050  LET S1= FNA(149)+150
00060  LET B1= FNA(9)
00070  FOR I=1 TO 6
00080    LET R(I)= 0
00090  NEXT I
00100  FOR I=1 TO 8
00110    FOR J=1 TO 8
00120      LET S(I,J)= 0
00150    NEXT J
00160  NEXT I
00163  LET L1= 0
00166  LET L2= 0
00170  LET D1= INT (( FNA(1999)+2000)/10)*10
00180  LET D3=40
00190  LET D2=D3+D1
00200  FOR I=1 TO S1
00210    LET A1= FNA(8)
00220    LET A2= FNA(8)
00225    IF S(A1,A2)>8 GOTO  210 
00230    LET S(A1,A2)=S(A1,A2)+1
00240  NEXT I
00250  FOR I=1 TO K1
00260    LET A1= FNA(8)
00270    LET A2= FNA(8)
00280    LET S(A1,A2)=S(A1,A2)+100
00290  NEXT I
00300  FOR I=1 TO B1
00310    LET A1= FNA(8)
00320    LET A2= FNA(8)
00330    LET S(A1,A2)=S(A1,A2)+10
00340  NEXT I
00350  LET E1= FNA(8)
00360  LET E2= FNA(8)
00370  LET E7= FNA(8)
00380  LET E8= FNA(8)
00390  LET P=3000
00400  LET C1= 0
00410  LET T1=10
00500  PRINT "ORDERS:  STARDATE =";D1
00510  PRINT 
00520  PRINT "   AS COMMANDER OF THE UNITED STARSHIP ENTERPRISE,"
00530  PRINT "YOUR MISSION IS TO RID THE GALAXY OF THE DEADLY"
00540  PRINT "KLINGON MENACE.  TO DO THIS, YOU MUST DESTROY THE"
00550  PRINT "KLINGON INVASION FORCE OF";K1;"BATTLE CRUISERS."
00560  PRINT "YOU HAVE";D3;"SOLAR DAYS TO COMPLETE YOUR MISSION."
00570  PRINT "(I.E. UNTIL STARDATE";D2;")."
00580  PRINT 
00590  PRINT "   YOU HAVE AT LEAST ONE SUPPORTING STARBASE."
00600  PRINT "WHEN THE ENTERPRISE DOCKS AT ONE (IS POSITIONED"
00610  PRINT "NEXT TO ONE) IT IS RESUPPLIED WITH ENERGY AND"
00620  PRINT "PHOTON TORPEDOES.  THE ENTERPRISE IS"
00630  PRINT "CURRENTLY IN QUADRANT";E1;"-";E2
00635  PRINT "SECTOR";E7;"-";E8
00655  PRINT 
00998  GOSUB  2500 
00999  GOSUB  3530 
01000  GOSUB  1700 
01005  GOSUB  3530 
01008  PRINT 
01015  PRINT "COMMAND";
01020  INPUT C2
01025  PRINT 
01030  IF C2= 0 GOTO  3200 
01040  IF C2=1 GOTO  1610 
01050  IF C2=2 GOTO  2900 
01060  IF C2=3 GOTO  5000 
01070  IF C2=4 GOTO  6000 
01080  IF C2=5 GOTO  1500 
01100  PRINT "  YOUR CHOICES OF COMMAND ARE:"
01105  PRINT "  0 = SET COURSE"
01110  PRINT "  1 = SHORT RANGE SENSOR SCAN"
01120  PRINT "  2 = LONG RANGE SENSOR SCAN"
01130  PRINT "  3 = FIRE PHASERS"
01140  PRINT "  4 = FIRE PHOTON TORPEDOES"
01150  PRINT "  5 = DAMAGE CONTROL REPORT"
01170  GOTO  1005 
01500  IF R(6)< 0 GOTO  1590 
01510  PRINT "DEVICE         STATE OF REPAIR"
01520  FOR C2=1 TO 6
01530    GOSUB  4320 
01540    PRINT "   ";R(C2)
01550  NEXT C2
01580  GOTO  1005 
01590  PRINT "DAMAGE CONTROL IS NOT AVAILABLE."
01600  GOTO  1005 
01610  PRINT 
01620  GOTO  1000 
01700  REM       SUBROUTINE TO OUTPUT S.R. SENSOR SCAN
01710  IF R(2)>= 0 GOTO  1740 
01720  PRINT "***S.R. SENSORS ARE OUT***"
01730  GOTO  1770 
01740  GOSUB  2500 
01750  LET C2=26
01760  GOSUB  2300 
01770  FOR I=1 TO 8
01775    IF R(2)< 0 GOTO  1930 
01778    PRINT "    ";
01780    FOR J=1 TO 8
01790      IF D(I,J)> 0 GOTO  1820 
01800      PRINT " .";
01810      GOTO  1920 
01820      IF D(I,J)>1 GOTO  1850 
01830      PRINT " *";
01840      GOTO  1920 
01850      IF D(I,J)>2 GOTO  1880 
01860      PRINT " K";
01870      GOTO  1920 
01880      IF D(I,J)>3 GOTO  1910 
01890      PRINT " B";
01900      GOTO  1920 
01910      PRINT " E";
01920    NEXT J
01930    IF I>1 GOTO  1960 
01940    PRINT "   STARDATE",D1
01950    GOTO  2200 
01960    IF I>2 GOTO  2060 
01970    PRINT "   CONDITION",
01980    IF C1> 0 GOTO  2010 
01990    PRINT " GREEN"
02000    GOTO  2200 
02010    IF C1>1 GOTO  2040 
02020    PRINT "YELLOW"
02030    GOTO  2200 
02040    IF C1>2 GOTO  2050 
02043    PRINT "RED"
02045    GOTO  2200 
02050    PRINT " DOCKED"
02055    GOTO  2200 
02060    IF I>3 GOTO  2090 
02070    PRINT "   QUADRANT",E1;"-";E2
02080    GOTO  2200 
02090    IF I>4 GOTO  2120 
02100    PRINT "   SECTOR",E7;"-";E8
02110    GOTO  2200 
02120    IF I>5 GOTO  2150 
02130    PRINT "   ENERGY",P
02140    GOTO  2200 
02150    IF I>6 GOTO  2180 
02160    PRINT "   TORPEDOES",T1
02170    GOTO  2200 
02180    IF I>7 GOTO  2210 
02190    PRINT "   KLINGONS",K1
02200    GOTO  2220 
02210    PRINT "   DAYS LEFT",D2-D1
02220  NEXT I
02230  GOSUB  2300 
02240  RETURN 
02300  REM      SUBROUTINE TO OUTPUT STRING OF DASHES
02305  PRINT "    ";
02310  FOR I1=1 TO C2
02320    PRINT "-";
02330  NEXT I1
02340  PRINT 
02350  RETURN 
02500  REM      SUBROUTINE TO COMPUTE QUADRANT LAYOUT
02501  IF L1<>E1 GOTO  2505 
02502  IF L2<>E2 GOTO  2505 
02503  RETURN 
02505  LET L1=E1
02506  LET L2=E2
02510  FOR I=1 TO 8
02520    FOR J=1 TO 8
02530      LET D(I,J)= 0
02540    NEXT J
02550  NEXT I
02580  LET D(E7,E8)=4
02610  FOR I=1 TO S(E1,E2)- INT (S(E1,E2)/10)*10
02620    LET E3= FNA(8)
02630    LET E4= FNA(8)
02640    IF D(E3,E4)<> 0 GOTO  2620 
02650    LET D(E3,E4)=1
02660  NEXT I
02670  FOR I=1 TO S(E1,E2)/10- INT (S(E1,E2)/100)*10
02680    LET E3= FNA(8)
02690    LET E4= FNA(8)
02700    IF D(E3,E4)<> 0 GOTO  2680 
02710    LET D(E3,E4)=3
02720  NEXT I
02730  FOR I=1 TO S(E1,E2)/100
02735    LET J(I)=300
02740    LET E3= FNA(8)
02750    LET E4= FNA(8)
02760    IF D(E3,E4)<> 0 GOTO  2740 
02770    LET D(E3,E4)=2
02780  NEXT I
02790  RETURN 
02900  IF R(3)= 0 GOTO  2930 
02910  PRINT "*** L.R. SENSORS ARE OUT ***"
02920  GOTO  1005 
02930  PRINT "LONG RANGE SENSOR SCAN FOR QUADRANT";
02935  PRINT E1;"-";E2
02940  LET C2=19
02950  GOSUB  2300 
02960  FOR I=E1-1 TO E1+1
02965    PRINT "    ";
02970    FOR J=E2-1 TO E2+1
02980      IF I<1 GOTO  3070 
02985      IF I>8 GOTO  3070 
02990      IF J<1 GOTO  3050 
02995      IF J>8 GOTO  3050 
03000      PRINT ":";S(I,J);
03010    NEXT J
03015    PRINT 
03020    GOSUB  2300 
03030  NEXT I
03040  GOTO  1005 
03050  PRINT ":"; 0;
03060  GOTO  3010 
03070  PRINT ":"; 0;":"; 0;":"; 0
03080  GOTO  3020 
03200  PRINT "COURSE";
03210  INPUT C2
03220  PRINT "   WARP FACTOR (0-8)";
03230  INPUT C3
03235  PRINT 
03240  IF C3< 0 GOTO  3200 
03241  IF C3>8 GOTO  3200 
03250  IF R(1)= 0 GOTO  3290 
03260  IF C3<=.2 GOTO  3290 
03270  PRINT "WARP ENGINES ARE DAMAGED; MAXIMUM WARP = .2"
03280  GOTO  3200 
03290  LET P=P-16*C3+5
03300  LET N1= INT (8*C3)
03310  LET N2=- COS (C2*3.14159/180)
03312  IF  ABS (N2)>.01 GOTO  3320 
03313  LET N2= 0
03320  LET N3= SIN (C2*3.14159/180)
03322  IF  ABS (N3)>.01 GOTO  3324 
03323  LET N3= 0
03324  REM      
03330  FOR A1=1 TO N1
03340    LET E3=E7
03350    LET E4=E8
03360    LET P1= INT (E3+N2+.4)
03370    LET P2= INT (E4+N3+.4)
03380    IF P1<1 GOTO  4000 
03385    IF P1>8 GOTO  4000 
03390    IF P2<1 GOTO  4070 
03395    IF P2>8 GOTO  4070 
03400    IF D(P1,P2)<> 0 GOTO  4150 
03410    LET D(E3,E4)= 0
03420    LET D(P1,P2)=4
03430    LET E7= INT (P1)
03440    LET E8= INT (P2)
03450  NEXT A1
03460  LET D1=D1+1
03470  FOR I=1 TO 6
03480    IF R(I)= 0 GOTO  3520 
03490    LET R(I)=R(I)+1
03500    IF R(I)< 0 GOTO  3520 
03510    LET R(I)= 0
03520  NEXT I
03525  GOTO  4200 
03530  REM       SCAN FOR DOCKED STARSHIP
03540  FOR I=E7-1 TO E7+1
03550    IF I<1 GOTO  3600 
03555    IF I>8 GOTO  3600 
03560    FOR J=E8-1 TO E8+1
03570      IF J<1 GOTO  3590 
03575      IF J>8 GOTO  3590 
03580      IF D(I,J)=3 GOTO  3680 
03590    NEXT J
03600  NEXT I
03610  LET C1= 0
03620  IF S(E1,E2)<100 GOTO  3650 
03630  LET C1=2
03640  GOTO  3735 
03650  IF P>100 GOTO  3735 
03660  LET C1=1
03670  GOTO  3735 
03680  LET C1=3
03690  LET P=3000
03700  LET T1=10
03710  FOR I=1 TO 6
03720    LET R(I)= 0
03730  NEXT I
03735  RETURN 
03740  REM       CHECK FOR SPACE STORM OR TRUCE
03750  LET C2= RND ( 0)
03760  IF C2<.35 GOTO  3860 
03770  IF C2<.95 GOTO  3970 
03780  PRINT "*** SPACE STORM, ";
03790  IF C1<3 GOTO  3820 
03800  PRINT "STARBASE SHIELDS PROTECT ENTERPRISE ***"
03810  GOTO  3970 
03820  GOSUB  4300 
03830  PRINT " DAMAGED  ***"
03840  LET R(C2)=R(C2)-5* RND ( 0)
03850  GOTO  3970 
03860  FOR I=1 TO 6
03870    IF R(I)<> 0 GOTO  3900 
03880  NEXT I
03890  GOTO  3970 
03900  PRINT "*** TRUCE, ";
03910  LET C2=I
03920  GOSUB  4320 
03930  PRINT " STATE OF REPAIR IMPROVED ***"
03940  LET R(I)=R(I)+2* RND ( 0)
03950  IF R(I)< 0 GOTO  3970 
03960  LET R(I)= 0
03970  RETURN 
04000  LET S2= SGN (P1-1)
04010  LET S3=E1+S2
04020  LET E7= INT (P1)-8*S2
04030  LET L1= 0
04040  IF S3<1 GOTO  4060 
04041  IF S3>8 GOTO  4060 
04050  LET E1=E1+S2
04060  IF P2<1 GOTO  4070 
04065  IF P2<=8 GOTO  4130 
04070  LET S2= SGN (P2-1)
04080  LET S3=E2+S2
04090  LET E8= INT (P2)-8*S2
04100  LET L2= 0
04110  IF S3<1 GOTO  4130 
04115  IF S3>8 GOTO  4130 
04120  LET E2=S3
04130  GOSUB  2500 
04140  GOTO  3450 
04150  PRINT "ENTERPRISE BLOCKED AT";
04155  PRINT  INT (P1);"-"; INT (P2)
04160  GOTO  3460 
04200  GOSUB  3530 
04205  GOSUB  3740 
04210  GOSUB  4500 
04215  IF P< 0 GOTO  9990 
04220  IF D1>D2 GOTO  9900 
04230  GOTO  1000 
04300  REM       SUBROUTINE TO OUTPUT DAMAGE CNTRL MESS\GE
04310  LET C2= FNA(6)
04320  IF C2>1 GOTO  4350 
04330  PRINT "WARP ENGINES";
04340  RETURN 
04350  IF C2>2 GOTO  4380 
04360  PRINT "S.R. SENSORS";
04370  RETURN 
04380  IF C2>3 GOTO  4410 
04390  PRINT "L.R. SENSORS";
04400  RETURN 
04410  IF C2>4 GOTO  4440 
04420  PRINT "PHASER CNTRL";
04430  RETURN 
04440  IF C2>5 GOTO  4470 
04450  PRINT "PHOTON TUBES";
04460  RETURN 
04470  PRINT "DAMAGE CNTRL";
04480  RETURN 
04500  IF S(E1,E2)<100 GOTO  4690 
04510  LET G=1
04520  LET H= 0
04530  FOR I=1 TO S(E1,E2)/100
04540    LET H=H+1
04550    IF H<=8 GOTO  4580 
04560    LET H=1
04570    LET G=G+1
04580    IF D(G,H)<>2 GOTO  4540 
04582    LET Q1=G-E7
04583    LET Q2=H-E8
04590    LET D4= SQR (Q1*Q1+Q2*Q2)
04600    LET P5= FNA(J(I)-1)
04610    LET J(I)=J(I)-P5
04620    GOSUB  4700 
04630    LET P=P-P6
04640    PRINT "ENTERPRISE HIT (";P6;" UNITS) KLINGON AT ";
04650    PRINT "SECTOR";G;"-";H
04670  NEXT I
04680  IF P<= 0 GOTO  9910 
04690  RETURN 
04700  LET P6=P5/D4
04710  RETURN 
05000  REM       PHASER CONTROL
05010  IF R(4)= 0 GOTO  5040 
05020  PRINT "*** PHASER CONTROL IS DAMAGED ***"
05030  GOTO  1005 
05040  PRINT "PHASERS LOCKED ON TARGET.  ";
05050  PRINT "ENERGY AVAILABLE =";P
05060  PRINT "NUMBER OF UNITS TO FIRE:";
05070  INPUT C2
05071  IF C2< 0 GOTO  5060 
05075  PRINT 
05080  IF C2>P GOTO  5050 
05090  LET P=P-C2
05100  IF S(E1,E2)<100 GOTO  5360 
05110  LET P5=C2/( INT (S(E1,E2)/100))
05120  LET G=1
05130  LET H= 0
05140  FOR I=1 TO S(E1,E2)/100
05150    LET H=H+1
05160    IF H<9 GOTO  5190 
05170    LET H=1
05180    LET G=G+1
05185    IF G>8 GOTO  5360 
05190    IF D(G,H)>2 GOTO  5150 
05192    LET Q1=G-E7
05194    LET Q2=H-E8
05195    IF D(G,H)<2 GOTO  5150 
05200    LET D4= SQR (Q1*Q1+Q2*Q2)
05210    LET P6=P5/D4
05220    LET J(I)=J(I)-P6
05230    PRINT "KLINGON AT";G;"-";H;"HIT (";P6;"UNITS) LEFT=";J(I)
05250    IF J(I)> 0 GOTO  5350 
05260    PRINT "***DESTROYED"
05270    FOR I2=I+1 TO S(E1,E2)/100
05280      LET J(I2-1)=J(I2)
05290    NEXT I2
05300    LET S(E1,E2)=S(E1,E2)-100
05310    LET K1=K1-1
05320    LET D(G,H)= 0
05330    LET I=I-1
05350  NEXT I
05360  IF K1= 0 GOTO  9000 
05370  GOSUB  3530 
05375  GOSUB  4500 
05380  GOTO  1005 
06000  REM      PHOTON CONTROL
06010  IF R(5)= 0 GOTO  6040 
06020  PRINT "*** PHOTON TUBES ARE OUT ***"
06030  GOTO  1005 
06040  IF T1> 0 GOTO  6045 
06041  PRINT "TORPEDO SUPPLY EXHAUSTED!!"
06042  GOTO  1005 
06045  PRINT "TORPEDO COURSE";
06050  INPUT C2
06052  PRINT 
06055  LET T1=T1-1
06060  LET N2=- COS (C2*3.14159/180)
06070  IF  ABS (N2)>.01 GOTO  6090 
06080  LET N2= 0
06090  LET N3= SIN (C2*3.14159/180)
06100  IF  ABS (N3)>.01 GOTO  6120 
06110  LET N3= 0
06120  LET P1=E7
06130  LET P2=E8
06140  LET P1=P1+N2
06150  LET P2=P2+N3
06153  PRINT "    ";
06155  PRINT  INT (P1*10)/10;"-"; INT (P2*10)/10
06160  IF P1<.5 GOTO  6350 
06165  IF P1>8.5 GOTO  6350 
06170  IF P2<.5 GOTO  6350 
06175  IF P2>8.5 GOTO  6350 
06190  IF D(P1+.4,P2+.4)= 0 GOTO  6140 
06200  IF D(P1+.4,P2+.4)>1 GOTO  6230 
06210  PRINT "STAR DESTROYED"
06215  LET S(E1,E2)=S(E1,E2)-1
06220  GOTO  6300 
06230  IF D(P1+.4,P2+.4)>2 GOTO  6280 
06240  PRINT "*** KLINGON DESTROYED ***"
06250  LET S(E1,E2)=S(E1,E2)-100
06260  LET K1=K1-1
06265  GOSUB  3530 
06270  GOTO  6300 
06280  PRINT "STARBASE DESTROYED"
06290  LET S(E1,E2)=S(E1,E2)-10
06300  LET D(P1+.4,P2+.4)= 0
06310  IF K1= 0 GOTO  9000 
06320  GOSUB  3530 
06330  GOSUB  4500 
06340  GOTO  1005 
06350  PRINT "TORPEDO MISSED"
06360  GOTO  6310 
09000  PRINT "IT IS STARDATE";D1
09010  PRINT "THE KLINGONS HAVE BEEN DESTROYED"
09020  PRINT "THE FEDERATION IS SAFE."
09030  PRINT "CONGRATULATIONS !"
09040  STOP 
09900  PRINT "IT IS STARDATE";D1
09910  PRINT "THE ENTERPRISE HAS BEEN DESTROYED."
09920  PRINT "THE FEDERATION WILL BE CONQUERED."
09930  PRINT "THERE ARE STILL";K1;"KLINGON BATTLE CRUISERS LEFT"
09940  PRINT "YOU ARE DEAD"
09950  PRINT "CAPTAIN KIRK, ANOTHER GAME (1=YES)";
09960  INPUT Z9
09970  IF Z9=1 GOTO  30 
09990  STOP 
09999  END 
